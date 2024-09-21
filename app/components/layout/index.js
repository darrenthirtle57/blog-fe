"use client";
import { useState } from "react";
// import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
// import HelmetWrapper from "@/app/components/HelmetWrapper";

function Layout({ title, children }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <main className="w-full h-full">
      <div>
        {/* <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} /> */}
        <div className="lg:pl-72-">
          <Header
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
            title={title}
          />
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </main>
  );
}

export default Layout;
