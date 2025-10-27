import React from "react";
import { ArrowRight } from "lucide-react";

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="bg-[#fef7ef] fixed top-0 left-0 right-0  flex justify-between items-center px-4 md:px-8 h-30">
      <div className="w-100 cursor-pointer mx-4 ml-8 overflow-hidden">
        <a href="#">
          <img src="/assets/students/Slide 2/Slide 2.1.png" alt="logo" />
        </a>
      </div>
      <div className="px-10 mt-12 mx-6 items-center container">
        {/* Nếu chưa đăng nhập */}
        {!isLoggedIn ? (
          <nav className="flex gap-4 justify-end">
            <a
              href="#"
              class="flex items-center justify-center py-6 px-16 rounded-4xl font-bold text-2xl
           bg-[#ffecca] text-[#ef7131]"
            >
              Đăng nhập
            </a>
            <a
              href="#"
              class="flex items-center justify-center py-6 px-12 rounded-4xl font-bold text-2xl
           bg-[#ef7131] text-white shadow-xl"
            >
              Đăng ký ngay <ArrowRight size={25} />
            </a>
          </nav>
        ) : (
          // Nếu đã đăng nhập
          <nav className="flex gap-4">
            <a href="#" className="hover:text-gray-200">
              Home
            </a>
            <a href="#" className="hover:text-gray-200">
              Profile
            </a>
            <button
              onClick={onLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
