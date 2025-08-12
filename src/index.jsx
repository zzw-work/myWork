import React from "react";
import ReactDom from "react-dom";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./styles/glabel.less";



const rootDom = document.getElementById("root");

const root = ReactDom.createRoot(rootDom);

root.render(
    <React.Suspense fallback={<div>稍等</div>}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </React.Suspense>
);


