import React from "react";
import { Outlet } from "react-router";
import Header from "../Header/Header";

const WithNav = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default WithNav;
