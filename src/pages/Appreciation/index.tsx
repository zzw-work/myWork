import React, { useEffect, useRef, useState } from "react";
import { Button, Space, Swiper, Toast } from "antd-mobile";

import { View } from "src/components/View";
import { Text } from "src/components/Text";
import { Mask } from "src/components/Mask";
import { Dialog } from "src/components/Dialog";
import { ListView } from "src/components/ListView";

import NavBar from "src/components/navBar";
import { NavBarRef } from "src/components/navBar/interface";

import "./index.less";

const attendanceData = {
  userInfo: {
    userName: "张三",
    userAvatar:
      "https://img.alicdn.com/imgextra/i1/O1CN01YueAbx1ZL7KJKKxf1_!!6000000003177-2-tps-128-128.png",
    departmentName: "xx科技-xx-xx技术-xx部门",
  },
  addressInfo: {
    isAttendanceScope: true,
    address: "xx园区xx楼",
  },
  clockInInfo: {
    isClockIn: false,
    clockInTime: "",
  },
  clockOutInfo: {
    isClockOut: false,
    clockOutTime: "",
  },
};

const list = [
  {
    desc: "平均工时",
    value: 8.5,
  },
  {
    desc: "出勤天数",
    value: 11,
  },
  {
    desc: "出勤班次",
    value: 1,
  },
  {
    desc: "休息天数",
    value: 7,
  },
  {
    desc: "迟到",
    value: 0,
  },
  {
    desc: "早退",
    value: 0,
  },
  {
    desc: "缺卡",
    value: 0,
  },
  {
    desc: "旷工",
    value: 0,
  },
  {
    desc: "外勤",
    value: 0,
  },
  {
    desc: "加班",
    value: 0,
  },
  {
    desc: "补卡申请",
    value: 0,
  },
];

const Appreciation = () => {
  const navRef = useRef<NavBarRef>(null);
  const listViewRef = useRef<any>(null);
  const [navHeight, setNavHeight] = useState(176);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isClockIn, setIsClockIn] = useState(
    attendanceData?.clockInInfo?.isClockIn
  );
  const [showIndex, setShowIndex] = useState(0);

  // 使用 useState Hook 来存储当前时间
  const [time, setTime] = useState(new Date());

  // 使用 useEffect Hook 来设置一个定时器，每秒更新一次时间
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 清除定时器，以避免内存泄漏
    return () => {
      clearInterval(timer);
    };
  }, []);
  const renderNavContent = () => {
    return (
      <View
        style={{
          width: "596rpx",
          justifyContent: "center",
          color: "#222222",
          fontSize: "34rpx",
          fontFamily: "PingFang SC",
          fontWeight: "500",
        }}
      >
        {selectedIndex === 0 ? "考勤打卡" : "统计"}
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
            height: `calc(100vh - ${navHeight / 2}px)`,
            marginTop: `${navHeight / 2}px`,
          }}
        >
          {selectedIndex === 0 ? (
            <>
              <View style={{ height: "8px" }} />
              <View
                style={{
                  height: "70px",
                  width: "351px",
                  borderRadius: "12px",
                  background: "#fff",
                  padding: "12px 11px",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    height: "50px",
                    width: "270px",
                    justifyContent: "flex-start",
                  }}
                >
                  <img
                    src={attendanceData?.userInfo?.userAvatar}
                    width={"40px"}
                    height={"40px"}
                    style={{
                      borderRadius: "50%",
                    }}
                  />
                  <View
                    style={{
                      marginLeft: "12px",
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        fontSize: "19px",
                        fontWeight: "500",
                        color: "#222222",
                      }}
                    >
                      {attendanceData?.userInfo?.userName}
                    </View>
                    <View
                      style={{
                        fontSize: "10px",
                        fontWeight: "400",
                        color: "#999999",
                      }}
                    >
                      {attendanceData?.userInfo?.departmentName}
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: "50px",
                    width: "50px",
                    flexDirection: "column",
                    fontSize: "9px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <img
                      src="https://img.alicdn.com/imgextra/i4/O1CN01KKgRSs1zeyWBYjrSL_!!6000000006740-2-tps-200-200.png"
                      width={"20px"}
                      height={"20px"}
                    />
                  </View>
                  <View
                    style={{
                      color: "#999999",
                    }}
                  >
                    申请
                  </View>
                </View>
              </View>
              <View style={{ height: "8px" }} />
              <View
                style={{
                  height: "400px",
                  width: "351px",
                  borderRadius: "12px",
                  background: "#fff",
                  padding: "12px 11px",
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    height: "50px",
                    justifyContent: "space-around",
                  }}
                >
                  <View
                    style={{
                      width: "150px",
                      flexDirection: "column",
                      background: "#eee",
                      borderRadius: "6px",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#222222",
                      }}
                    >
                      上班09:00
                    </Text>
                    <Text
                      style={{
                        marginLeft: "8px",
                        marginTop: "1px",
                        fontSize: "10px",
                        lineHeight: "20px",
                        color: "#999",
                      }}
                    >
                      {isClockIn ? (
                        <>
                          <img
                            src="https://img.alicdn.com/imgextra/i4/O1CN01oNDRuR1ZdRAzE2lIC_!!6000000003217-2-tps-200-200.png"
                            width={"10px"}
                            height={"10px"}
                            style={{
                              marginRight: "4px",
                            }}
                          />
                          {attendanceData?.clockInInfo?.clockInTime}已打卡
                        </>
                      ) : (
                        "未打卡"
                      )}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "150px",
                      flexDirection: "column",
                      background: "#eee",
                      borderRadius: "6px",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#222222",
                      }}
                    >
                      下班18:00
                    </Text>
                    <Text
                      style={{
                        marginLeft: "8px",
                        marginTop: "1px",
                        fontSize: "10px",
                        lineHeight: "20px",
                        color: "#999",
                      }}
                    >
                      {attendanceData?.clockOutInfo?.isClockOut ? (
                        <>
                          <img
                            src="https://img.alicdn.com/imgextra/i4/O1CN01oNDRuR1ZdRAzE2lIC_!!6000000003217-2-tps-200-200.png"
                            width={"10px"}
                            height={"10px"}
                            style={{
                              marginRight: "4px",
                            }}
                          />
                          {attendanceData?.clockOutInfo?.clockOutTime}已打卡
                        </>
                      ) : (
                        "未打卡"
                      )}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "200px",
                    marginTop: "100px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#FFF",
                  }}
                >
                  <View
                    style={{
                      width: "120px",
                      height: "120px",
                      background: "#1296db",
                      borderRadius: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 5px #1296db",
                      flexDirection: "column",
                    }}
                    onClick={() => {
                      if (isClockIn) {
                        attendanceData.clockOutInfo.isClockOut = true;
                        attendanceData.clockOutInfo.clockOutTime = `${time.getHours()}:
                          ${
                            time.getMinutes() < 10
                              ? `0${time.getMinutes()}`
                              : time.getMinutes()
                          }
                          `;
                        // Toast.open({
                        //   title: "更新下班打卡成功",
                        //   duration: 2000,
                        // });
                      } else {
                        attendanceData.clockInInfo.isClockIn = true;
                        setIsClockIn(true);
                        attendanceData.clockInInfo.clockInTime = `${time.getHours()}:
                          ${
                            time.getMinutes() < 10
                              ? `0${time.getMinutes()}`
                              : time.getMinutes()
                          }
                          `;
                        // Toast.open({
                        //   title: "上班打卡成功",
                        //   duration: 2000,
                        // });
                      }
                    }}
                  >
                    {isClockIn ? "下班打卡" : "上班打卡"}
                    <Text
                      style={{
                        fontSize: "12px",
                        color: "#ccc",
                        marginTop: "4px",
                      }}
                    >
                      {`${time.getHours()}:
                          ${
                            time.getMinutes() < 10
                              ? `0${time.getMinutes()}`
                              : time.getMinutes()
                          }
                          :${
                            time.getSeconds() < 10
                              ? `0${time.getMinutes()}`
                              : time.getSeconds()
                          }`}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        marginLeft: "8px",
                        marginTop: "4px",
                        fontSize: "10px",
                        lineHeight: "20px",
                        color: "#999",
                      }}
                    >
                      <img
                        src="https://img.alicdn.com/imgextra/i4/O1CN01oNDRuR1ZdRAzE2lIC_!!6000000003217-2-tps-200-200.png"
                        width={"10px"}
                        height={"10px"}
                        style={{
                          marginRight: "4px",
                        }}
                      />
                      {attendanceData?.addressInfo?.isAttendanceScope &&
                        "已进入考勤范围："}
                      {attendanceData?.addressInfo?.isAttendanceScope ===
                        false && "未进入考勤范围"}
                      {attendanceData?.addressInfo?.address}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={{ height: "8px" }} />
              <View
                style={{
                  height: "70px",
                  width: "350px",
                  borderRadius: "12px",
                  background: "#fff",
                  padding: "12px 11px",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    height: "50px",
                    width: "150px",
                    justifyContent: "flex-start",
                  }}
                >
                  <img
                    src={attendanceData?.userInfo?.userAvatar}
                    width={"40px"}
                    height={"40px"}
                    style={{
                      borderRadius: "50%",
                    }}
                  />
                  <View
                    style={{
                      marginLeft: "12px",
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        fontSize: "19px",
                        fontWeight: "500",
                        color: "#222222",
                      }}
                    >
                      {attendanceData?.userInfo?.userName}
                    </View>
                    <View
                      style={{
                        fontSize: "10px",
                        fontWeight: "400",
                        color: "#999999",
                        width: "100px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {attendanceData?.userInfo?.departmentName}
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: "7px",
                    height: "33px",
                    width: "152px",
                    fontSize: "9px",
                    borderRadius: "3px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    background: "#ccc",
                  }}
                >
                  <View
                    style={{
                      width: "50px",
                      background: `${showIndex === 0 ? "#fff" : "#ccc"}`,
                      height: "30px",
                      fontSize: "12px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "3px",
                      marginLeft: "1px",
                    }}
                    onClick={() => {
                      setShowIndex(0);
                    }}
                  >
                    日
                  </View>
                  <View
                    style={{
                      width: "50px",
                      background: `${showIndex === 1 ? "#fff" : "#ccc"}`,
                      height: "30px",
                      fontSize: "12px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "3px",
                    }}
                    onClick={() => {
                      setShowIndex(1);
                    }}
                  >
                    周
                  </View>
                  <View
                    style={{
                      width: "50px",
                      background: `${showIndex === 2 ? "#fff" : "#ccc"}`,
                      height: "30px",
                      fontSize: "12px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "3px",
                    }}
                    onClick={() => {
                      setShowIndex(2);
                    }}
                  >
                    月
                  </View>
                </View>
              </View>
              <View style={{ height: "16rpx" }} />
              <View
                style={{
                  height: "330px",
                  width: "350px",
                  borderRadius: "12px",
                  background: "#fff",
                  padding: "12px 11px",
                  flexDirection: "column",
                }}
              >
                {showIndex === 0 && (
                  <View
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      2025 | 2.18
                    </View>
                    <View
                      style={{
                        width: "330px",
                        height: "80px",
                        background: "#eee",
                        marginTop: "5px",
                        borderRadius: "4px",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        fontSize: "12px",
                        color: "#999",
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "#1296db",
                            marginLeft: "6px",
                            marginRight: "6px",
                          }}
                        />
                        全天考勤正常
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "orange",
                            marginLeft: "6px",
                            marginRight: "6px",
                          }}
                        />
                        当天存在异常：迟到、早退、缺卡
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "purple",
                            marginLeft: "6px",
                            marginRight: "6px",
                          }}
                        />
                        当天提交过：请假、加班、出差、外出、补卡申请
                      </View>
                    </View>
                  </View>
                )}
                {showIndex === 1 && (
                  <View
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      2025 | 2.17 - 2.23
                    </View>
                    <View
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gridGap: "4px",
                      }}
                    >
                      {list?.map((item) => {
                        return (
                          <View
                            style={{
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "50px",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: "14px",
                                color: `${item?.value > 0 ? "#000" : "#ccc"}`,
                              }}
                            >
                              {item?.value}
                            </Text>
                            <Text
                              style={{
                                fontSize: "10px",
                                color: "#ccc",
                              }}
                            >
                              {item?.desc}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}
                {showIndex === 2 && (
                  <View
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      2025 | 2月
                    </View>
                    <View
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gridGap: "6px",
                      }}
                    >
                      {list?.map((item) => {
                        return (
                          <View
                            style={{
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "50px",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: "14px",
                                color: `${item?.value > 0 ? "#000" : "#ccc"}`,
                              }}
                            >
                              {item?.value}
                            </Text>
                            <Text
                              style={{
                                fontSize: "10px",
                                color: "#ccc",
                              }}
                            >
                              {item?.desc}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}
              </View>
            </>
          )}
        </ListView>
      </View>
    );
  };
  return (
    <View className={"container"}>
      <NavBar
        ref={navRef}
        bgColor={"#fff"}
        immersive
        backIconColor={"#252525"}
        statusBarHeight={88}
        navHeight={navHeight}
        notShow={true}
      >
        {renderNavContent()}
      </NavBar>
      {renderContent()}
      <View
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          height: "50px",
          background: "#fff",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            fontSize: "12px",
            color: "#ccc",
          }}
          onClick={() => {
            setSelectedIndex(0);
          }}
        >
          <img
            src={
              selectedIndex === 0
                ? "https://img.alicdn.com/imgextra/i4/O1CN01iPDU8B1GWaYPdR7TO_!!6000000000630-2-tps-200-200.png"
                : "https://img.alicdn.com/imgextra/i2/O1CN01IaSsfY1cgaklZis04_!!6000000003630-2-tps-200-200.png"
            }
            width={"25px"}
            height={"25px"}
            style={{
              marginTop: "4px",
              marginBottom: "4px",
            }}
          />
          <Text>打卡</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            fontSize: "12px",
            color: "#ccc",
          }}
          onClick={() => {
            setSelectedIndex(1);
          }}
        >
          <img
            src={
              selectedIndex === 1
                ? "https://img.alicdn.com/imgextra/i1/O1CN016g5pGG1HimibQWez1_!!6000000000792-2-tps-200-200.png"
                : "https://img.alicdn.com/imgextra/i1/O1CN01hx2TQT1ORZ8e4h0K1_!!6000000001702-2-tps-200-200.png"
            }
            width={"20px"}
            height={"20px"}
            style={{
              marginTop: "4px",
              marginBottom: "4px",
            }}
          />
          <Text>统计</Text>
        </View>
      </View>
    </View>
  );
};

export default Appreciation;
