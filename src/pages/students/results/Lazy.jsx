import React, { useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export default function LazyVerticalTabs() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = {
    math: {
      label: "MATH",
      data: [
        { name: "TOPIC 1: NUMBERS", score: 50 },
        { name: "TOPIC 2: OPERATIONS", score: 29 },
        { name: "TOPIC 3: GEOMETRY", score: 73 },
        { name: "TOPIC 4: HANDLING DATA", score: 84 },
        { name: "TOPIC 5: MEASUREMENT", score: 96 },
        { name: "TOPIC 6: LOGICAL THINKING", score: 51 },
      ],
    },
    inf: {
      label: "Tin học",
      data: [
        { name: "TOPIC 1: Máy tính và em", score: 80 },
        { name: "TOPIC 2: Đạo đức, pháp luật trong môi trường số", score: 60 },
        { name: "TOPIC 3: Lưu trữ, tìm kiếm thông tin", score: 43 },
        { name: "TOPIC 4: Ứng dụng tin học", score: 24 },
        { name: "TOPIC 5: Lập trình Scratch", score: 59 },
        { name: "TOPIC 6: Lập trình Swift PlayGround", score: 70 },
      ],
    },
    science: {
      label: "SCIENCE",
      data: [
        { name: "TOPIC 1: LIVING THINGS", score: 70 },
        { name: "TOPIC 2: HUMAN BODY", score: 30 },
        { name: "TOPIC 3: MATTER & MATERIALS", score: 43 },
        { name: "TOPIC 4: FORCES, ENERGY & MOTION", score: 64 },
        { name: "TOPIC 5: EARTH & SPACES", score: 56 },
        { name: "TOPIC 6: ENVIRONMENT", score: 91 },
      ],
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">Kết quả học tập</h1>

      <div className="flex flex-col gap-2 w-4/5">
        {Object.entries(subjects).map(([key, subject]) => {
          const isActive = selectedSubject === key;
          return (
            <div
              key={key}
              onClick={() => setSelectedSubject(isActive ? null : key)}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                isActive
                  ? "bg-blue-100 shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {/* Header: tên môn + mũi tên */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{subject.label}</h2>
                <span className="text-2xl transition-transform duration-300">
                  {isActive ? "▲" : "▼"}
                </span>
              </div>

              {/* Nội dung mở rộng */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  isActive
                    ? "max-h-[500px] mt-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ProgressBar data={subject.data} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
