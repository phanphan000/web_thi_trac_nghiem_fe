import React from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full flex justify-between items-center pt-40 bg-[var(--color-background)]">
      <img
        src="/assets/students/Slide 2/Slide 2.3.png"
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
      />
      <div className="w-1/2 max-w-4xl mx-auto z-10">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl primary-text-color text-center leading-normal">
            WELCOME TO <br />
            BRAINY LAND
          </h1>
          <p className="text-xl primary-text-color text-center mt-5">
            Một sân chơi toàn diện cho Math, Science, Tin học
            <br />
            Dành riêng cho Học Sinh Ngôi Sao Hoàng Mai
          </p>
        </div>
      </div>
      <div className="w-1/2 max-w-4xl mx-auto z-10">
        <div className="flex justify-center items-center">
          <button
            onClick={() => navigate("/test/instructions")}
            className="w-3/5 bg-[var(--color-secondary)] text-white text-6xl px-10 py-5 rounded-full cursor-pointer transition-all transform hover:scale-105 shadow-lg"
          >
            TEST
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
