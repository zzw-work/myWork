/**
 * author: 钟郑威
 * introduction：token相关
 * */

//设置token
export const setToken = (days) => {
  console.log("days", days);
  let expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = "token" + "=" + "true" + expires + "; path=/";
};

//获取token
export const getToken = () => {
  return document?.cookie?.split("; ")?.find((row) => row.startsWith("token="));
};
