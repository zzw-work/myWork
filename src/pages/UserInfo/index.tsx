/**
 * author：钟郑威
 * introduction： 工作台
 */

import React, { useEffect, useReducer, useState, useRef } from "react";
import { View } from "src/components/View";
import { Text } from "src/components/Text";
import { Mask } from "src/components/Mask";
import { Dialog } from "src/components/Dialog";
import { ListView } from "src/components/ListView";
import NavBar from "src/components/navBar";
import { NavBarRef } from "src/components/navBar/interface";
import "./index.less";

const { Header, Refresh, Item, LoadMore, BackTop } = ListView;

const statusBarHeight = 88;
const navHeight = 176;

const WorkBenches = () => {
  const navRef = useRef<NavBarRef>(null);
  const adminInfo = {
    name: "Admin",
    avatar:
      "https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png",
    userid: "00000001",
    userType: "admin",
    departmentId: 1,
    departmentName: "行业技术-端体验",
    phone: "13800138000",
  };

  const renderNavContent = () => {
    return (
      <View className={"navContent"}>
        <Text className={"navContentTitle"} textOverflow="ellipsis">
          个人信息
        </Text>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View className="content">
        <View className="userInfo">
          <View className="header">
            <View className="logo">
              <Text style={{ color: "red" }}>Our</Text>
              <Text>&nbsp;Link</Text>
            </View>
          </View>
          <View className="userInfoContent">
            <View className="avatar">
              <img src={adminInfo.avatar} alt="" />
            </View>
            <View className="info">
              <View className="name">{adminInfo.name}</View>
              <View className="userid">#{adminInfo.userid}</View>
              <View className="departmentName">
                xx集团-xx-xx技术-{adminInfo.departmentName}
              </View>
            </View>
          </View>
          <View className="userInfoBottom">
            <View className="phone">手机：{adminInfo.phone}</View>
          </View>
        </View>
        <View className="tab">
          <View className="tabItem">帮助中心</View>
          <View className="tabItem">意见反馈</View>
          <View className="tabItem">更新介绍</View>
          <View className="tabItem">版本更新</View>
          <View style={{ height: "8px", background: "#ededed" }}></View>
          <View className="tabItem">设置</View>
        </View>
      </View>
    );
  };
  return (
    <View
      className="container"
      onFirstAppear={() => {
        console.log("onFirstAppear");
      }}
    >
      <NavBar
        ref={navRef}
        bgColor={"#AE66FF"}
        immersive
        backIconColor={"#fff"}
        statusBarHeight={statusBarHeight}
        navHeight={navHeight}
        notShow={true}
      >
        {renderNavContent()}
      </NavBar>
      {renderContent()}
      {/* <View className="content" onClick={() => setOpen(true)}>
        展示Mask
      </View>
      <View className="content" onClick={() => setDialogOpen(true)}>
        展示Dialog
      </View>
      <Mask open={open} onClick={clickMask} />
      <Dialog
        open={dialogOpen}
        text4Cancel="关闭"
        text4Ok="确定"
        title="确定消耗100积分"
        description="我的积分：1000"
        onOk={onClikOk}
        onCancel={() => setDialogOpen(false)}
        onClose={() => setDialogOpen(false)}
        center
      /> */}
    </View>
  );
};

export default WorkBenches;
