/**
 * author：钟郑威
 * introduction： 路由配置文件,创建HistoryRouter实例
 */

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RouterAuth from "./RouterAuth";

const Login = React.lazy(() => import("src/pages/Login"));
const LayOut = React.lazy(() => import("src/Layout"));
const Workbenches = React.lazy(() => import("src/pages/Workbenches"));
const UserInfo = React.lazy(() => import("src/pages/UserInfo"));
const Appreciation = React.lazy(() => import("src/pages/Appreciation"));
const Test = React.lazy(() => import("src/pages/Test"));

const NotFound = React.lazy(() => import("src/pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterAuth children={<LayOut />}></RouterAuth>,
    children: [
      {
        // path: "Workbenches",
        index: true,
        element: <Workbenches></Workbenches>,
      },
      {
        path: "userInfo",
        element: <UserInfo></UserInfo>,
      },
      {
        path: "test",
        element: <Test></Test>,
      },
      {
        path: "appreciation",
        element: <Appreciation></Appreciation>,
      },
    ],
  },
  {
    path: "/Login",
    element: <Login></Login>,
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export default router;
