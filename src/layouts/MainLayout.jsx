import React from "react";
import Header from "../components/Header";

const MainLayout = ({ children, isLoggedIn, onLogout }) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="h-screen bg-[#fef7ef]">{children}</main>
    </div>
  );
};

export default MainLayout;
