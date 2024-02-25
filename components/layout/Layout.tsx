import React from "react";
import Footer from "../shared/Footer/Footer";
import Header from "../shared/Header/Header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="bg-common relative flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <div className="absolute bottom-20 text-5xl text-secondary right-5 cursor-pointer">
          {/* <BsFillArrowUpCircleFill /> */}
        </div>
      </div>
    </>
  );
};

export default Layout;
