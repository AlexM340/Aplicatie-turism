import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <aside>Top menu</aside>
      <main>
        <div className="container-fluid px-5 py-2">
            <Outlet/>
        </div>
      </main>
    </>
  );
};

export default Layout;
