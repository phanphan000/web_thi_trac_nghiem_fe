import React from "react";
import ProgressBar from "@/components/ProgressBar";

export default function MathResults() {
  const subjects = [
    { name: "TOPIC 1: NUMBERS", score: 50 },
    { name: "TOPIC 2: OPERATIONS", score: 29 },
    { name: "TOPIC 3: GEOMETRY", score: 73 },
    { name: "TOPIC 4: HANDLING DATA", score: 84 },
    { name: "TOPIC 5: MEASUREMENT", score: 96 },
    { name: "TOPIC 6: LOGICAL THINKING", score: 51 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center pt-10">
      <div className=" p-8 w-full">
        <h1 className="text-5xl font-bold text-center mb-8 primary-text-color">
          Kết quả học tập
        </h1>
        <h2 className="text-3xl text-center font-semibold primary-text-color whitespace-nowrap">
          Toán học
        </h2>
        <div className="scale-90 mx-auto">
          <ProgressBar data={subjects} />
        </div>
      </div>
    </div>
  );
}
