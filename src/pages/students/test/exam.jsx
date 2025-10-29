// src/pages/students/test/Instructions.jsx
import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Exam() {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [answers, setAnswers] = useState({
    math1: "",
    math2: "",
    science1: "",
    science2: "",
    cs1: "",
    cs2: "",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    alert("Exam submitted successfully!");
    console.log("Submitted answers:", answers);
  };
  return (
    <div className="h-full bg-[var(-color-blackground)]  pt-30 primary-text-color">
      <img
        src="/assets/students/Slide 2/Slide 2.3.png"
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
      />
      <img
        src="/assets/students/Slide 15/38.png"
        className="absolute bottom-0 right-0 w-3/8 object-contain object-bottom z-1 "
      />

      <div className=" bg-gradient-to-br flex items-center justify-center">
        <div className="w-full max-w-2xl bg-[#f3ffff] rounded-3xl shadow-2xl p-5 relative border-4 border-orange-300">
          {/* Timer */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <div className="relative w-20 h-20">
              <img
                src="/public/assets/students/Slide 15/36.png"
                alt=""
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-bold text-gray-700">
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* MATH Section */}
          <div className="mt-8 mb-6">
            <h2 className="text-2xl primary-text-color mb-3 text-center">
              MATH
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <label className="text-lg primary-text-color whitespace-nowrap min-w-[120px]">
                  Question 1:
                </label>
                <input
                  type="text"
                  value={answers.math1}
                  onChange={(e) => handleInputChange("math1", e.target.value)}
                  className="flex-1 border-b-2 border-gray-300 focus:border-pink-500 outline-none py-2 text-gray-700"
                  placeholder="Your answer..."
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-lg primary-text-color whitespace-nowrap min-w-[120px]">
                  Question 2:
                </label>
                <input
                  type="text"
                  value={answers.math2}
                  onChange={(e) => handleInputChange("math2", e.target.value)}
                  className="flex-1 border-b-2 border-gray-300 focus:border-pink-500 outline-none py-2 text-gray-700"
                  placeholder="Your answer..."
                />
              </div>
            </div>
          </div>

          {/* SCIENCE Section */}
          <div className="mb-6">
            <h2 className="text-2xl primary-text-color mb-3 text-center">
              SCIENCE
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <label className="text-lg primary-text-color whitespace-nowrap min-w-[120px]">
                  Question 1:
                </label>
                <input
                  type="text"
                  value={answers.science1}
                  onChange={(e) =>
                    handleInputChange("science1", e.target.value)
                  }
                  className="flex-1 border-b-2 border-gray-300 focus:border-pink-500 outline-none py-2 text-gray-700"
                  placeholder="Your answer..."
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-lg primary-text-color whitespace-nowrap min-w-[120px]">
                  Question 2:
                </label>
                <input
                  type="text"
                  value={answers.science2}
                  onChange={(e) =>
                    handleInputChange("science2", e.target.value)
                  }
                  className="flex-1 border-b-2 border-gray-300 focus:border-pink-500 outline-none py-2 text-gray-700"
                  placeholder="Your answer..."
                />
              </div>
            </div>
          </div>

          {/* COMPUTER SCIENCE Section */}
          <div className="mb-6">
            <h2 className="text-2xl primary-text-color mb-3 text-center">
              COMPUTER SCIENCE
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <label className="text-lg primary-text-color whitespace-nowrap min-w-[120px]">
                  Question 1:
                </label>
                <input
                  type="text"
                  value={answers.cs1}
                  onChange={(e) => handleInputChange("cs1", e.target.value)}
                  className="flex-1 border-b-2 border-gray-300 focus:border-pink-500 outline-none py-2 text-gray-700"
                  placeholder="Your answer..."
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-lg primary-text-color whitespace-nowrap min-w-[120px]">
                  Question 2:
                </label>
                <input
                  type="text"
                  value={answers.cs2}
                  onChange={(e) => handleInputChange("cs2", e.target.value)}
                  className="flex-1 border-b-2 border-gray-300 focus:border-pink-500 outline-none py-2 text-gray-700"
                  placeholder="Your answer..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full z-10 flex items-center gap-2 shadow-lg transform transition hover:scale-105"
            >
              SUBMIT
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
