import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizApp({
  questions = SAMPLE_QUESTIONS,
  timePerQuiz = 600,
}) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState(false);
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false);
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
      if (index < questions.length - 1) {
        setIndex(index + 1);
      } else {
        // Không tự nộp nữa, chỉ dừng lại
        setSelected(null);
      }
    }, 900);
  }

  function finishQuiz(finalAnswers = answers) {
    const unanswered = finalAnswers.filter((a) => a === null).length;

    if (unanswered > 0) {
      setShowIncompleteWarning(true);
      return;
    }

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
          className="absolute bottom-0 right-0 w-3/8 object-contain object-bottom z-3z "
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
        className="absolute bottom-0 right-0 w-3/8 object-contain object-bottom z-3z "
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
                          isSelected ? "bg-gray-300 scale-[1.01]" : "bg-white"
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
                    Tiếp tục
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar: small summary */}
            <aside className="w-40 hidden md:flex flex-col h-full ">
              <div className="bg-gradient-to-b from-white to-indigo-50 p-4 rounded-xl shadow-inner text-center">
                <div className="text-sm">Tiến trình</div>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-7 w-7 rounded-full text-sm font-semibold flex items-center justify-center transition ${
                        answers[i] !== null
                          ? "bg-gray-400 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                      title={`Câu ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <button
                  onClick={() => finishQuiz()}
                  className="w-full px-4 py-2 rounded-xl bg-red-100 border shadow-lg hover:bg-red-200 transition"
                >
                  Nộp bài
                </button>
              </div>
            </aside>
          </div>

          {/* Div cảnh báo */}
          {showIncompleteWarning && (
            <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
                <h2 className="text-lg font-semibold text-yellow-700">
                  ⚠️ Còn câu chưa làm
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  Bạn vẫn còn một số câu hỏi chưa trả lời. Bạn có chắc chắn muốn
                  nộp bài không?
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      const s = answers.reduce(
                        (acc, a, i) =>
                          acc + (a === questions[i].correct ? 1 : 0),
                        0
                      );
                      setScore(s);
                      clearInterval(timerRef.current);
                      setShowIncompleteWarning(false);
                    }}
                    className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-white font-semibold"
                  >
                    Vẫn nộp bài
                  </button>
                  <button
                    onClick={() => setShowIncompleteWarning(false)}
                    className="px-4 py-2 rounded border font-medium"
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          )}
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
    title: "Con mèo kêu như thế nào?",
    options: ["Gâu gâu", "Meo meo", "Ò ó o", "Ụt ịt"],
    correct: 1,
    explanation: "Con mèo thường kêu meo meo.",
    image: null,
  },
  {
    title: "Trái đất quay quanh gì?",
    options: ["Mặt trăng", "Sao Hỏa", "Mặt trời", "Sao Kim"],
    correct: 2,
    explanation: "Trái đất quay quanh Mặt trời.",
    image: null,
  },
  {
    title: "1 mét bằng bao nhiêu centimet?",
    options: ["10", "100", "1000", "10000"],
    correct: 1,
    explanation: "1 mét bằng 100 centimet.",
    image: null,
  },
  {
    title: "Ai phát minh ra bóng đèn điện?",
    options: ["Newton", "Einstein", "Edison", "Tesla"],
    correct: 2,
    explanation: "Thomas Edison là người phát minh ra bóng đèn điện.",
    image: null,
  },
  {
    title: "Việt Nam nằm ở châu lục nào?",
    options: ["Châu Phi", "Châu Âu", "Châu Á", "Châu Mỹ"],
    correct: 2,
    explanation: "Việt Nam nằm ở châu Á.",
    image: null,
  },
  {
    title: "Thủ đô của Việt Nam là gì?",
    options: ["Hà Nội", "Huế", "Đà Nẵng", "TP.HCM"],
    correct: 0,
    explanation: "Thủ đô của Việt Nam là Hà Nội.",
    image: null,
  },
  {
    title: "Nước sôi ở nhiệt độ bao nhiêu độ C?",
    options: ["50", "75", "90", "100"],
    correct: 3,
    explanation: "Nước sôi ở 100°C (áp suất thường).",
    image: null,
  },
  {
    title: "Hành tinh nào gần Mặt trời nhất?",
    options: ["Trái đất", "Sao Kim", "Sao Thủy", "Sao Hỏa"],
    correct: 2,
    explanation: "Sao Thủy là hành tinh gần Mặt trời nhất.",
    image: null,
  },
  {
    title: "Từ nào sau đây là danh từ?",
    options: ["Chạy", "Đẹp", "Ngôi nhà", "Nhanh"],
    correct: 2,
    explanation: "“Ngôi nhà” là danh từ (chỉ sự vật).",
    image: null,
  },
  {
    title: "Quốc kỳ Việt Nam có màu gì?",
    options: ["Xanh và trắng", "Đỏ và vàng", "Đen và đỏ", "Trắng và xanh"],
    correct: 1,
    explanation: "Quốc kỳ Việt Nam có nền đỏ và ngôi sao vàng ở giữa.",
    image: null,
  },
  {
    title: "Một năm có bao nhiêu tháng?",
    options: ["10", "11", "12", "13"],
    correct: 2,
    explanation: "Một năm có 12 tháng.",
    image: null,
  },
  {
    title: "Chữ cái đầu tiên trong bảng chữ cái tiếng Việt là gì?",
    options: ["B", "A", "C", "D"],
    correct: 1,
    explanation: "Chữ cái đầu tiên là A.",
    image: null,
  },
  {
    title: "Trong toán học, π (pi) xấp xỉ bằng bao nhiêu?",
    options: ["2.14", "3.14", "4.13", "3.41"],
    correct: 1,
    explanation: "Số π (pi) xấp xỉ 3.14.",
    image: null,
  },
  {
    title: "Con người dùng cơ quan nào để nghe?",
    options: ["Mũi", "Mắt", "Tai", "Miệng"],
    correct: 2,
    explanation: "Tai là cơ quan dùng để nghe.",
    image: null,
  },
  {
    title: "Ngày Quốc khánh Việt Nam là ngày nào?",
    options: ["1/5", "2/9", "30/4", "20/11"],
    correct: 1,
    explanation: "Ngày Quốc khánh Việt Nam là 2/9.",
    image: null,
  },
  {
    title: "Tháng Hai có bao nhiêu ngày (năm thường)?",
    options: ["28", "29", "30", "31"],
    correct: 0,
    explanation: "Tháng Hai có 28 ngày trong năm thường.",
    image: null,
  },
  {
    title: "Mặt trăng là vệ tinh của hành tinh nào?",
    options: ["Sao Kim", "Trái đất", "Sao Hỏa", "Sao Thủy"],
    correct: 1,
    explanation: "Mặt trăng là vệ tinh tự nhiên của Trái đất.",
    image: null,
  },
  {
    title: "Phương tiện nào di chuyển trên không?",
    options: ["Ô tô", "Máy bay", "Tàu hỏa", "Xe đạp"],
    correct: 1,
    explanation: "Máy bay di chuyển trên không.",
    image: null,
  },
  {
    title: "Hình nào có 3 cạnh?",
    options: ["Hình tròn", "Hình vuông", "Hình tam giác", "Hình chữ nhật"],
    correct: 2,
    explanation: "Hình tam giác có 3 cạnh.",
    image: null,
  },
  {
    title: "Cầu thủ dùng gì để đá bóng?",
    options: ["Tay", "Đầu", "Chân", "Gối"],
    correct: 2,
    explanation: "Cầu thủ chủ yếu dùng chân để đá bóng.",
    image: null,
  },
  {
    title: "Tác giả của truyện 'Dế Mèn phiêu lưu ký' là ai?",
    options: ["Nam Cao", "Ngô Tất Tố", "Tô Hoài", "Nguyễn Du"],
    correct: 2,
    explanation: "Tác giả là nhà văn Tô Hoài.",
    image: null,
  },
  {
    title: "Ngọn núi cao nhất thế giới là gì?",
    options: ["Phan Xi Păng", "Everest", "Alpes", "Kilimanjaro"],
    correct: 1,
    explanation: "Everest là ngọn núi cao nhất thế giới.",
    image: null,
  },
  {
    title: "Trái tim nằm ở bên nào của cơ thể người?",
    options: ["Bên phải", "Bên trái", "Giữa", "Sau lưng"],
    correct: 1,
    explanation: "Trái tim nằm lệch về bên trái.",
    image: null,
  },
  {
    title: "Loài chim nào có thể bắt chước tiếng người?",
    options: ["Chim sẻ", "Chim công", "Chim vẹt", "Chim én"],
    correct: 2,
    explanation: "Chim vẹt có thể bắt chước tiếng người.",
    image: null,
  },
  {
    title: "Mùa nào thường có thời tiết nóng nhất?",
    options: ["Xuân", "Hạ", "Thu", "Đông"],
    correct: 1,
    explanation: "Mùa hạ (mùa hè) là mùa nóng nhất.",
    image: null,
  },
  {
    title: "Cơ quan nào giúp con người hô hấp?",
    options: ["Tim", "Phổi", "Gan", "Thận"],
    correct: 1,
    explanation: "Phổi giúp con người hô hấp (hít thở).",
    image: null,
  },
  {
    title: "Số nhỏ nhất trong các số sau: 5, 2, 8, 10?",
    options: ["5", "2", "8", "10"],
    correct: 1,
    explanation: "Số nhỏ nhất là 2.",
    image: null,
  },
  {
    title: "Tác phẩm 'Truyện Kiều' do ai sáng tác?",
    options: ["Nguyễn Du", "Ngô Tất Tố", "Xuân Diệu", "Nam Cao"],
    correct: 0,
    explanation: "Tác phẩm 'Truyện Kiều' do Nguyễn Du sáng tác.",
    image: null,
  },
  {
    title: "Biển nào lớn nhất thế giới?",
    options: ["Biển Đông", "Thái Bình Dương", "Đại Tây Dương", "Ấn Độ Dương"],
    correct: 1,
    explanation: "Thái Bình Dương là đại dương lớn nhất thế giới.",
    image: null,
  },
  {
    title: "Loài động vật nào sau đây biết bay?",
    options: ["Cá", "Rắn", "Chim", "Hổ"],
    correct: 2,
    explanation: "Chim là loài động vật biết bay.",
    image: null,
  },
];

// Notes for integration:
// - Nạp câu hỏi thực tế bằng cách truyền prop `questions` = [{title, options, correct, explanation, image}]
// - Thiết lập `timePerQuiz` (giây) nếu muốn giới hạn thời gian
// - Tích hợp âm thanh, hiệu ứng confetti (framer-motion / canvas) nếu muốn thêm phần sinh động
// - Tailwind cần được cấu hình sẵn trong dự án (content paths) để classnames hoạt động
