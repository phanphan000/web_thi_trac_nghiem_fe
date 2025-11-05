import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizApp({
  questions = SAMPLE_QUESTIONS,
  timePerQuiz = 300,
}) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timePerQuiz); // in seconds
  const timerRef = useRef(null);

  useEffect(() => {
    // start timer
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      finishQuiz();
    }
  }, [timeLeft]);

  function handleSelect(optionIndex) {
    if (showAnswer) return; // don't change after showing
    setSelected(optionIndex);
    const newAnswers = [...answers];
    newAnswers[index] = optionIndex;
    setAnswers(newAnswers);
    // show correct/incorrect briefly
    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      setSelected(null);
      if (index < questions.length - 1) setIndex(index + 1);
      else finishQuiz(newAnswers);
    }, 900);
  }

  function finishQuiz(finalAnswers = answers) {
    // calculate score
    const s = finalAnswers.reduce((acc, a, i) => {
      return acc + (a === questions[i].correct ? 1 : 0);
    }, 0);
    setScore(s);
    clearInterval(timerRef.current);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill(null));
    setShowAnswer(false);
    setScore(null);
    setTimeLeft(timePerQuiz);
    timerRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
  }

  // Accessibility: allow number keys 1..4 to choose
  useEffect(() => {
    function onKey(e) {
      if (score !== null) return;
      if (
        e.key >= "1" &&
        e.key <= String(Math.min(4, questions[index].options.length))
      ) {
        handleSelect(parseInt(e.key, 10) - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, showAnswer, score]);

  if (!questions || questions.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-lg w-full">
          <h2 className="text-xl font-semibold">Chưa có câu hỏi</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Xin hãy nạp bộ câu hỏi trước khi bắt đầu.
          </p>
        </div>
      </div>
    );

  if (score !== null) {
    return (
      <div className="min-h-screen flex items-center justify-center p-30 bg-[var(--color-blackground)] primary-text-color">
        <img
          src="/assets/students/Slide 2/Slide 2.3.png"
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
        />
        <img
          src="/assets/students/Slide 15/38.png"
          className="absolute bottom-0 right-0 w-3/8 object-contain object-bottom z-11 "
        />
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full text-center z-10">
          <h1 className="text-3xl font-extrabold">Kết quả</h1>
          <p className="mt-4 text-lg">
            Bạn trả lời đúng <span className="font-semibold">{score}</span> trên{" "}
            <span className="font-semibold">{questions.length}</span>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={restart}
              className="py-3 rounded-xl shadow-md border hover:scale-[1.01] transition"
            >
              Làm lại
            </button>
            <button
              onClick={() => navigate("/test")}
              className="py-3 rounded-xl shadow-md border bg-yellow-100 hover:brightness-95 transition"
            >
              Thoát
            </button>
          </div>
          <div className="mt-6 text-sm text-gray-600">
            Thời gian còn lại khi nộp: {formatTime(timeLeft)}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[index];
  const progress = Math.round((index / questions.length) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center p-30 bg-[var(--color-blackground)] primary-text-color">
      <img
        src="/assets/students/Slide 2/Slide 2.3.png"
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
      />
      <img
        src="/assets/students/Slide 15/38.png"
        className="absolute bottom-0 right-0 w-3/8 object-contain object-bottom z-11 "
      />
      <div className="w-full max-w-3xl z-10">
        <header className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Bài kiểm tra vui</h2>
            <p className="text-sm text-gray-600">
              Dành cho học sinh tiểu học — Hãy chọn đáp án đúng.
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm">
              Câu {index + 1} / {questions.length}
            </div>
            <div className="text-xs mt-1">
              Thời gian còn lại:{" "}
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </header>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className="h-3 rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg,#60a5fa,#fbbf24)",
              }}
            />
          </div>

          {/* Question card */}
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <div className="rounded-xl p-4 border border-dashed border-gray-100 bg-gradient-to-br from-white to-blue-50">
                <div className="text-lg font-semibold mb-2">{q.title}</div>
                {q.image && (
                  <img
                    src={q.image}
                    alt="question"
                    className="w-full max-h-40 object-contain rounded-md my-2"
                  />
                )}
                <div className="mt-2 grid gap-3">
                  {q.options.map((opt, i) => {
                    const isSelected = selected === i || answers[index] === i;
                    const isCorrect = q.correct === i;
                    const reveal = showAnswer && (isCorrect || isSelected);

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(i)}
                        disabled={showAnswer}
                        className={`w-full text-left p-4 rounded-xl shadow-sm border transition transform focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300 hover:scale-103 ${
                          isSelected ? "scale-[1.01]" : ""
                        }`}
                        aria-pressed={isSelected}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-white border">
                            {String.fromCharCode(65 + i)}
                          </div>
                          <div className="flex-1">{opt}</div>
                          {/* small badge when reveal */}
                          {/* {reveal && (
                            <div
                              className={`px-3 py-1 rounded-full text-sm ${
                                isCorrect
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {isCorrect ? "Đúng" : "Sai"}
                            </div>
                          )} */}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Controls */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="px-2 py-1 rounded bg-white shadow-sm">
                    Mẹo: Dùng phím 1-4
                  </div>
                  <div className="px-2 py-1 rounded bg-white shadow-sm">
                    Kéo thả không cần thiết
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (index > 0) setIndex(index - 1);
                    }}
                    disabled={index === 0}
                    className="px-4 py-2 rounded-xl border shadow-lg"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={() => {
                      if (index < questions.length - 1) setIndex(index + 1);
                      else finishQuiz();
                    }}
                    className="px-4 py-2 rounded-xl bg-yellow-100 border shadow-lg hover:bg-yellow-200 transition"
                  >
                    Bỏ qua
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar: small summary */}
            <aside className="w-40 hidden md:block">
              <div className="bg-gradient-to-b from-white to-indigo-50 p-3 rounded-xl shadow-inner text-center">
                <div className="text-sm">Tiến trình</div>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-6 rounded ${
                        answers[i] === null
                          ? "bg-gray-200"
                          : answers[i] === questions[i].correct
                          ? "bg-green-300"
                          : "bg-red-300"
                      }`}
                      title={`Câu ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="mt-3 text-xs text-gray-600">
                  Câu đúng:{" "}
                  {answers.reduce(
                    (acc, a, i) => acc + (a === questions[i].correct ? 1 : 0),
                    0
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Helpers & Sample data ----------

function formatTime(sec) {
  if (sec <= 0) return "00:00";
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

const SAMPLE_QUESTIONS = [
  {
    title: "Con chó kêu như thế nào?",
    options: ["Meo meo", "Gâu gâu", "Equ equ", "Chíp chíp"],
    correct: 1,
    explanation: "Con chó thường kêu gâu gâu.",
    image: null,
  },
  {
    title: "2 + 3 = ?",
    options: ["4", "5", "6", "7"],
    correct: 1,
    explanation: "2 + 3 = 5",
    image: null,
  },
  {
    title: "Mặt trời mọc ở hướng nào?",
    options: ["Tây", "Nam", "Đông", "Bắc"],
    correct: 2,
    explanation: "Mặt trời mọc ở hướng Đông.",
    image: null,
  },
];

// Notes for integration:
// - Nạp câu hỏi thực tế bằng cách truyền prop `questions` = [{title, options, correct, explanation, image}]
// - Thiết lập `timePerQuiz` (giây) nếu muốn giới hạn thời gian
// - Tích hợp âm thanh, hiệu ứng confetti (framer-motion / canvas) nếu muốn thêm phần sinh động
// - Tailwind cần được cấu hình sẵn trong dự án (content paths) để classnames hoạt động
