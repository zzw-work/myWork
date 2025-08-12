declare module "*.module.less" {
  const content: { [className: string]: string };
  export = content;
}
