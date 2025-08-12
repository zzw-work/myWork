import React, { useRef, useState, useEffect } from "react";
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";

const BarcodeBatchGenerator = ({
  barcodeValues = [],
  frameInterval = 50,
  setResults,
  setProgress,
}) => {
  const barcodeRefs = useRef([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const animationFrameId = useRef(null);
  const currentIndex = useRef(0);

  // 清理动画帧
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // 初始化ref数组
  useEffect(() => {
    barcodeRefs.current = barcodeRefs.current.slice(0, barcodeValues.length);
  }, [barcodeValues]);

  useEffect(() => {
    if (barcodeRefs.current.length > 0) {
      startGeneration();
    }
  }, []);

  // 启动批量生成
  const startGeneration = () => {
    setIsGenerating(true);
    setProgress(0);
    setResults(new Array(barcodeValues.length).fill(null));
    currentIndex.current = 0;
    processNextBarcode();
  };

  // 分帧处理下一个条形码
  const processNextBarcode = () => {
    const startTime = performance.now();

    while (
      currentIndex.current < barcodeValues.length &&
      performance.now() - startTime < frameInterval
    ) {
      console.log("执行1");
      processBarcode(currentIndex.current);
      currentIndex.current++;
      setProgress(
        Math.round((currentIndex.current / barcodeValues.length) * 100)
      );
    }

    if (currentIndex.current < barcodeValues.length) {
      animationFrameId.current = requestAnimationFrame(processNextBarcode);
    } else {
      setIsGenerating(false);
    }
  };

  // 处理单个条形码
  const processBarcode = (index) => {
    try {
      const element = barcodeRefs.current[index];
      if (!element) return;

      JsBarcode(element, barcodeValues[index], {
        format: "CODE128",
        width: 1.2,
        height: 60,
        displayValue: true,
        fontSize: 8,
        margin: 16,
      });

      html2canvas(element, {
        backgroundColor: null,
        scale: 0.8,
        logging: false,
      }).then((canvas) => {
        setResults((prev) => {
          const newResults = [...prev];
          newResults[index] = canvas.toDataURL("image/png");
          return newResults;
        });
      });
    } catch (error) {
      console.error(`条形码${index + 1}生成失败:`, error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            ios批量条形码生成器 (共{barcodeValues.length}个)
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {barcodeValues.map((value, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">条形码 {index + 1}</span>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {value}
                </span>
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
