import React from "react";

// import FooterBanner from "src/components/FooterBanner";
import { Outlet } from "react-router";
import { View } from "src/components/View";

const Layout = () => {
  return (
    <View>
      <Outlet></Outlet>
      {/* <FooterBanner /> */}
    </View>
  );
};

export default Layout;
