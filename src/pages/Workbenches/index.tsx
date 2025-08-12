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
import { Button, Space, Swiper, Toast } from "antd-mobile";
import NavBar from "src/components/navBar";
import { NavBarRef } from "src/components/navBar/interface";
import { useNavigate } from "react-router-dom";
import "./index.less";

const { Header, Refresh, Item, LoadMore, BackTop } = ListView;

const statusBarHeight = 88;
const navHeight = 176;

const imageInfos = [
  {
    title: "【放假通知】春节放假通知",
    content: `一、放假安排

根据国务院办公厅关于2025年部分节假日安排通知，结合公司及项目情况，2025年春节放假安排如下：
2025/1/28-2025/2/4  放假共计8天
2025/1/26（周日）,2025/2/8（周六）补班`,
  },
  {
    title: "【放假通知】春节放假通知",
    content: `一、放假安排

根据国务院办公厅关于2025年部分节假日安排通知，结合公司及项目情况，2025年春节放假安排如下：
2025/1/28-2025/2/4  放假共计8天
2025/1/26（周日）,2025/2/8（周六）补班`,
  },
];

const HeaderContent = ({ navigate }) => {
  return (
    <View
      style={{
        width: "375px",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          width: "375px",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <View
          style={{
            width: "320px",
            height: "170px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
            margin: "auto",
          }}
        >
          <Swiper autoplay loop>
            {imageInfos.map((item, index) => {
              return (
                <Swiper.Item key={index}>
                  <View
                    style={{
                      width: "320px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: "4px",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      {item.content}
                    </Text>
                  </View>
                </Swiper.Item>
              );
            })}
          </Swiper>
        </View>
        <View className={"headerContentProductBg"} />
      </View>
      <View className={"appreciationBoxWapper"}>
        <View
          style={{
            height: "200px",
          }}
        >
          <View
            style={{
              width: "375px",
              height: "150px",
              margin: "auto",
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
            }}
          >
            <View
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "9px",
                flexDirection: "column",
                background: "linear-gradient(180deg, #7f00ff, #b76fff)",
                color: "#fff",
              }}
              onClick={() => {
                navigate("/appreciation");
              }}
            >
              <img
                width={"26px"}
                height={"26px"}
                src="https://img.alicdn.com/imgextra/i2/O1CN01T9rFAK1bNz2rKZK4C_!!6000000003454-2-tps-200-200.png"
              />
              <Text>考勤打卡</Text>
            </View>
            <View
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "9px",
                flexDirection: "column",
                background: "linear-gradient(180deg, #7f00ff, #b76fff)",
                color: "#fff",
              }}
            >
              <img
                width={"26px"}
                height={"26px"}
                src="https://img.alicdn.com/imgextra/i3/O1CN01VoDWPu1kyvXClEW8J_!!6000000004753-2-tps-200-200.png"
              />
              <Text>OA审批</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const WorkBenches = () => {
  const navRef = useRef<NavBarRef>(null);
  const listViewRef = useRef<any>(null);
  const [pageError, setPageError] = useState<boolean>(false);
  const navigate = useNavigate();
  // console.log("styles", styles);

  const renderNavContent = () => {
    return (
      <View
        style={{
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text className={"navTitle"}>Our &nbsp;Link</Text>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View className={"content"} onFirstAppear={() => {}}>
        <ListView
          ref={listViewRef}
          showScrollbar={false}
          className={"listView"}
          style={{
            height: `calc(100vh - ${navHeight}rpx)`,
            marginTop: `${navHeight}rpx`,
          }}
        >
          <View className={"header"}>
            <HeaderContent navigate={navigate} />
          </View>
          <View
            style={{
              height: "209px",
              width: "100%",
              background: "#fff",
            }}
          >
            其他相关。。。
          </View>
        </ListView>
      </View>
    );
  };
  return (
    <View
      className={"container"}
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
        notShow
        showUserInfo
        hideBack
      >
        {renderNavContent()}
      </NavBar>
      {renderContent()}
    </View>
  );
};

export default WorkBenches;
