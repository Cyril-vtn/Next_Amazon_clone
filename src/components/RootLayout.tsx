import React, { Children, ReactElement } from "react";
import Header from "./header/Header";
import BottomHeader from "./header/BottomHeader";
import Footer from "./Footer";
import MobileNavavar from "./MobileNavbar";
import MobileNavbar from "./MobileNavbar";
interface Props {
  children: ReactElement;
}
const RootLayout = ({ children }: Props) => {
  return (
    <>
      {/* <Header /> */}
      <Header />
      {/* <BottomHeader /> */}
      <BottomHeader />

      {/* children */}
      {children}

      {/* <Footer /> */}
      <Footer />

      <MobileNavbar />
    </>
  );
};

export default RootLayout;
