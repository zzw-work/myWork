/**
 * author：钟郑威
 * introduction： 路由鉴权方法
 */
import React from "react";
import { Navigate } from "react-router-dom";
// import { getToken } from "DPUtils/token";

export default function RouterAuth({ children }) {
  const cookieValue = DPUtils.getToken();
  console.log("DPUtils.token.getToken()", DPUtils.getToken());
  if (cookieValue && cookieValue?.split("=")[1] === "true") {
    return <>{children}</>;
  } else {
    return <Navigate to={"/Login"}></Navigate>;
  }
}
