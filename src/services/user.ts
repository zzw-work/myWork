// import type { LoginParams, LoginResult, UserInfo } from "src/interfaces/user";

const adminInfo = {
  name: "Admin",
  avatar: "https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png",
  userid: "00000001",
  userType: "admin",
};
const userInfo = {
  name: "User",
  avatar: "https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png",
  userid: "00000002",
  userType: "user",
};
let currentUserInfo = {};

const waitTime = (time = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export async function login(data) {
  // return await request.post('/login', data);
  const { username, password } = data;
  await waitTime();
  if (username === "admin" && password === "ice") {
    currentUserInfo = adminInfo;
    return {
      success: true,
      userType: "admin",
    };
  }
  if (username === "user" && password === "ice") {
    currentUserInfo = userInfo;
    return {
      success: true,
      userType: "user",
    };
  }
  currentUserInfo = {};
  return {
    success: false,
    userType: "guest",
  };
}

// export async function fetchUserInfo() {
//   // return await request.get('/user');
//   return currentUserInfo;
// }

// export async function logout() {
//   // return await request.post('/logout');
//   console.log("logout");
// }
