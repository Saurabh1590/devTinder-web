import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="pt-20 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
