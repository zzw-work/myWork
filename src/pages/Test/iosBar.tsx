import React, { useRef, useState, useEffect } from "react";
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";

// 平台特性检测
const supportsIdleCallback = () =>
  typeof window !== "undefined" && "requestIdleCallback" in window;

const BarcodeBatchGenerator = ({ barcodeValues = [] }) => {
  const barcodeRefs = useRef([]);
  const [base64Results, setBase64Results] = useState([]);
  const [progress, setProgress] = useState(0);
  const taskQueue = useRef([]);
  const isProcessing = useRef(false);
  const frameId = useRef(null);

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

  // 空闲任务处理（Android）
  const processIdleTasks = (deadline) => {
    while (
      (deadline.timeRemaining() > 1 || deadline.didTimeout) &&
      taskQueue.current.length > 0
    ) {
      const task = taskQueue.current.shift();
      processSingleBarcode(task.index).then(task.resolve);
    }

    if (taskQueue.current.length > 0) {
      window.requestIdleCallback(processIdleTasks, { timeout: 1000 });
    } else {
      isProcessing.current = false;
    }
  };

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          优化版批量条形码生成器 (共{barcodeValues.length}个)
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
