import React, { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import * as style from "./index.module.css";
import * as styles from "./index.module.less";
import BarcodeBatchGenerator from "./BarcodeBatchGenerator";

// const BarcodeGenerator = ({ value = "123456789", options = {} }) => {
//   const barcodeRef = useRef(null);

//   useEffect(() => {
//     if (barcodeRef.current) {
//       JsBarcode(barcodeRef.current, value, {
//         format: "CODE128",
//         width: 2,
//         height: 100,
//         displayValue: true,
//         fontSize: 16,
//         lineColor: "#000000",
//         ...options,
//       });
//     }
//   }, [value, options]);

//   return <svg ref={barcodeRef} />;
// };

// const BarcodeGenerator = ({ value = "123456789", options = {} }) => {
//   const [barcodeValue, setBarcodeValue] = useState(value);
//   const [imageData, setImageData] = useState(null);
//   const barcodeRef = useRef(null);

//   const generateBarcode = () => {
//     // 这里应该调用实际的条形码生成库
//     // 由于没有指定具体库，这里仅做演示
//     if (barcodeRef.current) {
//       JsBarcode(barcodeRef.current, barcodeValue, {
//         format: "CODE128",
//         width: 2,
//         height: 100,
//         displayValue: true,
//         fontSize: 16,
//         lineColor: "#000000",
//         ...options,
//       });
//     }
//     console.log("Generating barcode for:", barcodeValue);
//   };

//   const captureScreenshot = () => {
//     if (barcodeRef.current) {
//       console.log("Capturing barcode screenshot...", barcodeRef.current);
//       html2canvas(barcodeRef.current).then((canvas) => {
//         const image = canvas.toDataURL("image/png");
//         console.log("Captured barcode image:", image);
//         setImageData(image);
//       });
//     }
//   };

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           value={barcodeValue}
//           onChange={(e) => setBarcodeValue(e.target.value)}
//           placeholder="输入条形码内容"
//         />
//         {/* <button onClick={generateBarcode}>生成条形码</button> */}
//         {/* <button onClick={captureScreenshot}>截图</button> */}
//       </div>
//       <canvas ref={barcodeRef} />

//       {imageData && (
//         <div>
//           <h3>截图结果:</h3>
//           <img
//             src={imageData}
//             alt="条形码截图"
//             style={{ border: "1px solid #ddd" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// const BarcodeGenerator = ({ initialValue = "ITEM-001", setBase64Image }) => {
//   const barcodeRef = useRef(null);
//   const [inputValue, setInputValue] = useState(initialValue);
//   const [isLoading, setIsLoading] = useState(false);

//   // 截图并转为base64
//   const captureBarcode = async () => {
//     if (!barcodeRef.current) return;

//     setIsLoading(true);
//     try {
//       const canvas = await html2canvas(barcodeRef.current, {
//         backgroundColor: null,
//         scale: 2,
//         logging: false,
//       });
//       setBase64Image(canvas.toDataURL("image/png"));
//     } catch (error) {
//       console.error("截图失败:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     // 生成条形码
//     if (!inputValue.trim()) return;
//     JsBarcode(barcodeRef.current, inputValue, {
//       format: "CODE128",
//       width: 2,
//       height: 100,
//       displayValue: true,
//       fontSize: 16,
//       margin: 10,
//       lineColor: "#2c3e50",
//     });
//     captureBarcode();
//   }, []);
//   return (
//     <div className="barcode-generator">
//       <div className="barcode-container">
//         <canvas ref={barcodeRef} />
//       </div>
//     </div>
//   );
// };

const Test = () => {
  const [barcodeValue, setBarcodeValue] = useState("123456789");
  // const [base64Image, setBase64Image] = useState("");
  const sampleBarcodes = [
    "PROD-2025-001",
    "PROD-2025-002",
    "PROD-2025-003",
    "PROD-2025-004",
    "PROD-2025-005",
    "PROD-2025-006",
    "PROD-2025-007",
    "PROD-2025-008",
    "PROD-2025-009",
    "PROD-2025-010",
    "PROD-2025-001",
    "PROD-2025-002",
    "PROD-2025-003",
    "PROD-2025-004",
    "PROD-2025-005",
    "PROD-2025-006",
    "PROD-2025-007",
    "PROD-2025-008",
    "PROD-2025-009",
    "PROD-2025-010",
  ];
  const [base64Results, setBase64Results] = useState([]);
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <h1 className={style.title}>Test</h1>
      <p className={styles.color}>Test page</p>
      <div
        onClick={() => {
          console.log("点击了打印", base64Results);
        }}
        className={styles.color}
      >
        {progress < 100 ? "正在生成中..." : "点击打印"}
      </div>
      {progress > 0 && (
        <div className="mb-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className={style.title}>生成进度: {progress}%</p>
        </div>
      )}
      <BarcodeBatchGenerator
        barcodeValues={sampleBarcodes}
        setBase64Results={setBase64Results}
        setProgress={setProgress}
        // setBase64Image={setBase64Image}
      />
      {/* {base64Results.length > 0 && (
        <div className="mt-6 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">生成结果 (Base64数组)</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-60">
            {JSON.stringify(
              base64Results.map((b) => b?.substring(0, 30) + "..."),
              null,
              2
            )}
          </pre>
        </div>
      )} */}
      {/* {base64Image && (
        <div className="result">
          <h3>Base64结果</h3>
          <textarea readOnly value={base64Image.substring(0, 100) + "..."} />
          <img src={base64Image} alt="条形码截图" />
        </div>
      )} */}
    </div>
  );
};
export default Test;
