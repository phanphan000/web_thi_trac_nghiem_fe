import React from "react";
import { useEffect, useRef } from "react";
import ProgressBar from "@/components/ProgressBar";

export default function Results() {
  const math = [
    { name: "TOPIC 1: NUMBERS", score: 50 },
    { name: "TOPIC 2: OPERATIONS", score: 29 },
    { name: "TOPIC 3: GEOMETRY", score: 73 },
    { name: "TOPIC 4: HANDLING DATA", score: 84 },
    { name: "TOPIC 5: MEASUREMENT", score: 96 },
    { name: "TOPIC 6: LOGICAL THINKING", score: 51 },
  ];
  const inf = [
    { name: "TOPIC 1: Máy tính và em", score: 80 },
    { name: "TOPIC 2: Đạo đức, pháp luật trong môi trường số", score: 60 },
    { name: "TOPIC 3: Lưu trữ, tìm kiếm thông tin", score: 43 },
    { name: "TOPIC 4: Ứng dụng tin học", score: 24 },
    { name: "TOPIC 5: Lập trình Scratch", score: 59 },
    { name: "TOPIC 6: Lập trình Swift PlayGround", score: 70 },
  ];
  const science = [
    { name: "TOPIC 1: LIVING THINGS", score: 70 },
    { name: "TOPIC 2: HUMAN BODY", score: 30 },
    { name: "TOPIC 3: MATTER & MATERIALS", score: 43 },
    { name: "TOPIC 4: FORCES, ENERGY & MOTION", score: 64 },
    { name: "TOPIC 5: EARTH & SPACES", score: 56 },
    { name: "TOPIC 6: ENVIRONMENT", score: 91 },
  ];

  const containerRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      const container = containerRef.current;
      if (!container) return;

      const scrollWidth = container.scrollWidth;
      const visibleWidth = container.offsetWidth;
      const maxScrollLeft = scrollWidth - visibleWidth;

      if (container.scrollLeft >= maxScrollLeft) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: visibleWidth, behavior: "smooth" });
      }
    }, 10000); // 3s mỗi lần trượt

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center pt-10">
      <div className=" p-8 w-full">
        <h1 className="text-5xl font-bold text-center primary-text-color">
          Kết quả học tập
        </h1>
        <div
          ref={containerRef}
          className="w-full overflow-x-auto flex scroll-smooth"
        >
          {/* slide 1 */}
          <div className="scale-90 mx-auto flex-shrink-0 px-4 w-full">
            <h2 className="text-3xl text-center font-semibold primary-text-color whitespace-nowrap mb-10">
              MATH
            </h2>
            <ProgressBar data={math} />
          </div>
          {/* Slide 2 */}
          <div className="scale-90 mx-auto flex-shrink-0 px-4 w-full">
            <h2 className="text-3xl text-center font-semibold primary-text-color whitespace-nowrap mb-10">
              Tin học
            </h2>
            <ProgressBar data={inf} />
          </div>
          {/* Slide 3 */}
          <div className="scale-90 mx-auto flex-shrink-0 px-4 w-full">
            <h2 className="text-3xl text-center font-semibold primary-text-color whitespace-nowrap mb-10">
              SCIENCE
            </h2>
            <ProgressBar data={science} />
          </div>
        </div>
      </div>
    </div>
  );
}
