import React from "react";
import Sidebar from "../components/home/sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="flex h-[98vh] gap-3">
        <div className=" bg-red-400 w-1/6 border rounded-xl p-4 border-blue-800 flex flex-col justify-between">
          <Sidebar></Sidebar>
        </div>
        <div className=" bg-blue-300 w-5/6 border rounded-xl p-4 border-blue-800">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Home;
