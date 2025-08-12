/**
 * @description 根据ast，将源码中的DPUtils替换为真实路径，
 * 对形如DPUtils.xxxx.yyyy()的代码，
 * 添加import { yyyy } from 'src/utils/xxxx'，
 * 并替换为yyyy()。
 */

const t = require("@babel/types");

/**
 * 整体思路
 * 1. 遍历所有的import语句，记录已经存在的import
 * 2. 遍历所有的CallExpression，替换DPUtils为真实路径，同时记录需要添加的import
 * 3. 遍历所有的import语句，合并同一模块的导入
 * 4. 添加剩余的import声明到AST的顶部
 */
module.exports = function (options = {}) {
  const utilsPath = options.utilsPath || "src/utils";
  return {
    Program: (path) => {
      const importsToAdd = new Map();
      const existingImports = new Map();

      const getImportName = (module, method) => {
        if (
          existingImports.has(module) &&
          existingImports.get(module).has(method)
        ) {
          return existingImports.get(module).get(method);
        }
        return `${module}_${method}`;
      };

      // 遍历所有的import语句，记录已经存在的import
      path.traverse({
        ImportDeclaration(path) {
          const sourcePath = path.node.source.value;
          if (!sourcePath.startsWith(utilsPath)) {
            return;
          }

          const module = sourcePath.slice(utilsPath.length + 1); // 得到模块名 "xxx"
          existingImports.set(module, new Map()); // 创建一个映射保存导入的名称和本地名称

          // 遍历specifiers来收集导入的名称和本地名称
          path.node.specifiers.forEach((specifier) => {
            if (t.isImportSpecifier(specifier)) {
              const importedName = specifier.imported.name; // 原始导入名 "yyyy"
              const localName = specifier.local.name; // 本地名，可能是前缀形式 "xxx_yyyy" 或 原始名 "yyyy"
              existingImports.get(module).set(importedName, localName);
            }
          });
        },
      });

      // 遍历所有的CallExpression，替换DPUtils为真实路径
      path.traverse({
        CallExpression(path) {
          // 检查是否为DPUtils的成员调用
          if (
            t.isMemberExpression(path.node.callee) &&
            t.isMemberExpression(path.node.callee.object) &&
            (t.isIdentifier(path.node.callee.object.object, {
              name: "DPUtils",
            }) ||
              t.isIdentifier(path.node.callee.object.object.object, {
                name: "DPUtils",
              })) &&
            t.isIdentifier(path.node.callee.object.property)
          ) {
            const module = path.node.callee.object.property.name;
            let importName = path.node.callee.property.name;
            const method = path.node.callee.property.name;
            // 生成新的CallExpression节点
            let newCallExpression = t.callExpression(
              t.identifier(getImportName(module, importName)),
              path.node.arguments
            );

            if (
              t.isIdentifier(path.node.callee.object.object.object, {
                name: "DPUtils",
              })
            ) {
              importName = path.node.callee.object.object.property.name;

              // 生成新的CallExpression节点，即：yyyy.zzz()
              newCallExpression = t.callExpression(
                t.identifier(`${getImportName(module, importName)}.${method}`),
                path.node.arguments
              );
            }

            // 替换原有CallExpression为新的CallExpression
            path.replaceWith(newCallExpression);

            // 如果我们已经有了对应的import声明，那么我们跳过添加和替换
            if (
              existingImports.has(module) &&
              existingImports.get(module).has(importName)
            ) {
              return;
            }
            // 如果我们还没有为此模块添加过导入，则添加
            if (!importsToAdd.has(module)) {
              importsToAdd.set(module, new Set());
            }
            importsToAdd.get(module).add(importName);
          }
        },
      });

      // 遍历所有的import语句，合并同一模块的导入
      path.traverse({
        ImportDeclaration(path) {
          const sourcePath = path.node.source.value;
          if (!sourcePath.startsWith(utilsPath)) {
            return;
          }

          const module = sourcePath.slice(utilsPath.length + 1);
          if (importsToAdd.has(module)) {
            const importSet = importsToAdd.get(module);
            path.node.specifiers.forEach((specifier) => {
              if (t.isImportSpecifier(specifier)) {
                importSet.delete(specifier.imported.name);
              }
            });

            if (importSet.size > 0) {
              importSet.forEach((method) => {
                path.node.specifiers.push(
                  t.importSpecifier(
                    t.identifier(getImportName(module, method)),
                    t.identifier(method)
                  )
                );
              });
              importsToAdd.delete(module);
            }
          }
        },
      });

      // 添加剩余的import声明到AST的顶部
      const importDeclarations = Array.from(importsToAdd.entries()).map(
        ([module, methods]) => {
          const specifiers = Array.from(methods).map((method) =>
            t.importSpecifier(
              t.identifier(`${module}_${method}`),
              t.identifier(method)
            )
          );
          return t.importDeclaration(
            specifiers,
            t.stringLiteral(`${utilsPath}/${module}`)
          );
        }
      );

      importDeclarations.forEach((importDeclaration) => {
        path.unshiftContainer("body", importDeclaration);
      });
    },
  };
};
