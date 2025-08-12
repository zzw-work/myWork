import React, { useRef, useState, useEffect } from "react";
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";

// const BarcodeBatchGenerator = ({
//   barcodeValues = [],
//   setBase64Results,
//   setProgress,
// }) => {
//   const barcodeRefs = useRef([]);
//   // const [base64Results, setBase64Results] = useState([]);
//   // const [progress, setProgress] = useState(0);

//   // 初始化ref数组
//   useEffect(() => {
//     barcodeRefs.current = barcodeRefs.current.slice(0, barcodeValues.length);
//   }, [barcodeValues]);

//   useEffect(() => {
//     if (barcodeRefs.current.length > 0) {
//       generateAllBarcodes();
//     }
//   }, []);

//   // 批量生成条形码
//   const generateAllBarcodes = async () => {
//     const results = [];
//     setProgress(0);

//     for (let i = 0; i < barcodeValues.length; i++) {
//       try {
//         // 生成条形码
//         JsBarcode(barcodeRefs.current[i], barcodeValues[i], {
//           format: "CODE128",
//           width: 2,
//           height: 100,
//           displayValue: true,
//           fontSize: 14,
//           margin: 10,
//         });

//         // 截图并转为base64
//         const canvas = await html2canvas(barcodeRefs.current[i], {
//           backgroundColor: null,
//           scale: 2,
//           logging: false,
//         });
//         results.push(canvas.toDataURL("image/png"));

//         // 更新进度
//         setProgress(Math.round(((i + 1) / barcodeValues.length) * 100));
//       } catch (error) {
//         console.error(`条形码${i + 1}生成失败:`, error);
//         results.push(null);
//       }
//     }

//     setBase64Results(results);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">
//           批量条形码生成器 (共{barcodeValues.length}个)
//         </h1>

//         {/* <button
//           onClick={generateAllBarcodes}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-6"
//         >
//           生成全部条形码
//         </button> */}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           {barcodeValues.map((value, index) => (
//             <div key={index} className="border rounded-lg p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="font-medium">条形码 {index + 1}</span>
//                 <span className="text-sm bg-gray-100 px-2 py-1 rounded">
//                   {value}
//                 </span>
//               </div>
//               <div className="flex justify-center bg-gray-50 p-3 rounded">
//                 <canvas ref={(el) => (barcodeRefs.current[index] = el)} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarcodeBatchGenerator;

// 平台特性检测
const supportsIdleCallback = () =>
  typeof window !== "undefined" && "requestIdleCallback" in window;

const BarcodeBatchGenerator = ({
  barcodeValues = [],
  setBase64Results,
  setProgress,
}) => {
  const barcodeRefs = useRef([]);
  const taskQueue = useRef([]);
  const isProcessing = useRef(false);
  const frameId = useRef(null);

  // 初始化ref数组
  useEffect(() => {
    barcodeRefs.current = barcodeRefs.current.slice(0, barcodeValues.length);
  }, [barcodeValues]);

  // 生成单个条形码并截图
  const processSingleBarcode = async (index) => {
    const value = barcodeValues[index];
    try {
      // 生成条形码
      JsBarcode(barcodeRefs.current[index], value, {
        format: "CODE128",
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 14,
        margin: 10,
      });

      // 截图并转为base64
      const canvas = await html2canvas(barcodeRefs.current[index], {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });

      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error(`条形码${index + 1}生成失败:`, error);
      return null;
    }
  };

  // iOS兼容方案：使用requestAnimationFrame分片
  const iosProcessQueue = () => {
    const startTime = performance.now();
    let processed = 0;

    const processChunk = () => {
      while (
        processed < taskQueue.current.length &&
        performance.now() - startTime < 16
      ) {
        // 每帧最多16ms
        const task = taskQueue.current[processed];
        processSingleBarcode(task.index).then(task.resolve);
        processed++;
        setProgress(Math.round((processed / barcodeValues.length) * 100));
      }

      if (processed < taskQueue.current.length) {
        frameId.current = requestAnimationFrame(processChunk);
      } else {
        isProcessing.current = false;
      }
    };

    processChunk();
  };

  // 统一任务调度入口
  const startProcessing = () => {
    if (isProcessing.current) return;

    isProcessing.current = true;
    taskQueue.current = barcodeValues.map((_, index) => ({
      index,
      resolve: (result) => {
        setBase64Results((prev) => {
          const newResults = [...prev];
          newResults[index] = result;
          return newResults;
        });
      },
    }));

    if (supportsIdleCallback()) {
      window.requestIdleCallback(processIdleTasks, { timeout: 1000 });
    } else {
      iosProcessQueue();
    }
  };

  // 空闲时间处理任务（Android）
  const processIdleTasks = (deadline) => {
    while (
      (deadline.timeRemaining() > 1 || deadline.didTimeout) &&
      taskQueue.current.length > 0
    ) {
      const task = taskQueue.current.shift();
      const { index, resolve } = task;

      processSingleBarcode(index).then((result) => {
        setBase64Results((prev) => {
          const newResults = [...prev];
          newResults[index] = result;
          return newResults;
        });
        setProgress(Math.round(((index + 1) / barcodeValues.length) * 100));
        resolve(result);
      });
    }

    if (taskQueue.current.length > 0) {
      window.requestIdleCallback(processIdleTasks, { timeout: 1000 });
    } else {
      isProcessing.current = false;
    }
  };

  useEffect(() => {
    if (barcodeRefs.current.length > 0) {
      startProcessing();
    }
  }, []);

  // 启动批量处理
  // const startBatchProcessing = () => {
  //   if (isProcessing.current) return;

  //   isProcessing.current = true;
  //   setBase64Results(new Array(barcodeValues.length).fill(null));
  //   setProgress(0);

  //   // 创建任务队列
  //   taskQueue.current = barcodeValues.map((_, index) => ({
  //     index,
  //     resolve: () => {},
  //   }));

  //   // 启动空闲时间处理
  //   window.requestIdleCallback(processTaskQueue, { timeout: 1000 });
  // };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          优化版批量条形码生成器 (共{barcodeValues.length}个)
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 zIndex">
          {barcodeValues.map((value, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">条形码 {index + 1}</span>
                <div className="text-xl font-bold text-gray-800 mb-4">
                  {value}
                </div>
              </div>
              <div className="flex justify-center bg-gray-50 p-3 rounded">
                <canvas ref={(el) => (barcodeRefs.current[index] = el)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarcodeBatchGenerator;
