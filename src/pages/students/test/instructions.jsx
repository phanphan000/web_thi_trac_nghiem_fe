// src/pages/students/test/Instructions.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { MousePointerClick } from "lucide-react";
export default function Instructions() {
  const navigate = useNavigate();

  return (
    <div className="h-full mx-10 flex justify-between pt-40 primary-text-color">
      <img
        src="/assets/students/Slide 2/Slide 2.3.png"
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
      />
      <div className="w-full max-w-4xl mx-auto z-10 flex-col flex items-center  gap-10 z-10 relative">
        <img
          src="/assets/students/Slide 14/34.png"
          alt=""
          className="max-w-full max-h-full object-contain scale-[1.25]"
        />
        <button
          onClick={() => navigate("/test/exam")}
          className="border border-black group flex items-center gap-2 text-xl bg-yellow-500 rounded-full px-8 py-4 hover:bg-yellow-300 transition-colors cursor-pointer
        absolute top-95"
        >
          <span className="text-blue-900 font-bold">START</span>
          <MousePointerClick className="w-6 h-6 text-blue-900 transform transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" />
        </button>
      </div>
    </div>
  );
}
