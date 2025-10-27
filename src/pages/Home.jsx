import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  {
    id: 0,
    component: <Section1 />,
    backgroundUrl: "/assets/students/Slide 2/Slide 2.3.png",
  },
  {
    id: 1,
    component: <Section2 />,
    backgroundUrl: null,
  },
  { id: 2, component: <Section3 /> },
  { id: 3, component: <Section4 /> },
  {
    id: 4,
    component: <Section5 />,
    backgroundUrl: "/assets/students/Slide 2/Slide 2.3.png",
  },
];

function Section1() {
  return (
    <div className="h-full mx-10 flex items-center justify-between">
      <div className="w-3/5">
        <h1 className="text-7xl mb-6 primary-text-color text-center">
          WELCOME TO
        </h1>
        <h1 className="text-7xl mb-6 primary-text-color text-center">
          BRAINY LAND
        </h1>
        <p className="text-4xl primary-text-color mb-3 text-center">
          Một sân chơi toàn diện cho Math,Science,Tin học
        </p>
        <p className="text-4xl primary-text-color text-center">
          Dành riêng cho Học sinh Ngôi Sao Hoàng Mai.
        </p>
      </div>

      <div className="w-2/5">
        <a
          href="#"
          class="flex items-center justify-center py-6 px-4 mb-40 rounded-4xl font-bold text-4xl
           bg-[#ef7131] text-white shadow-xl w-fit"
        >
          JOIN NOW FOR FREE
        </a>
      </div>
    </div>
  );
}
function Section2() {
  return (
    <div className="h-full w-full flex items-end justify-between absolute z-100">
      <div className="w-1/2 relative">
        <img
          src="/public/assets/students/Slide 3/Slide 3.1.png"
          alt="Slide 3.1.png"
          className="object-cover w-full"
        />
        <div className="absolute bottom-30 left-0 w-24 h-24 w-70">
          <img
            src="/public/assets/students/Slide 3/Slide 3.2.png"
            alt="Slide 3.2.png"
          />
        </div>
      </div>
      <div className="w-1/2">
        <div className=" w-full">
          <div
            className="inline-flex flex-col justify-center items-center 
                 bg-contain bg-center bg-no-repeat 
                 px-30 
                 text-center"
            style={{
              backgroundImage: "url('/assets/students/Slide 3/Slide 3.4.png')",
              backgroundSize: "100% 250%",
            }}
          >
            <p className="text-3xl font-semibold primary-text-color leading-snug m-10">
              Dành cho HS Tiểu học
              <br /> từ khối 3 - khối 5
            </p>
          </div>
        </div>
        <div className=" w-full mb-10">
          <div
            className="inline-flex flex-col justify-center items-center 
                 bg-contain bg-center bg-no-repeat 
                 py-10 md:p-12 lg:p-14 
                 text-center"
            style={{
              backgroundImage: "url('/assets/students/Slide 3/Slide 3.3.png')",
              backgroundSize: "100% 100%",
            }}
          >
            <p className="text-3xl font-semibold primary-text-color leading-snug m-10">
              Nội dung bám sát chương trình <br />
              Math, Science và Tin học <br />
              trường Ngôi Sao Hoàng Mai
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function Section3() {
  return (
    <>
      <div className="h-full mx-10 flex items-end justify-between relative">
        <div className="text-center w-full">
          <div className="mb-1">
            <h1 className="text-6xl primary-text-color">
              Khơi trí tuệ - Mở tương lai
            </h1>
            <div className="mt-3 flex justify-center gap-20 text-xl font-semibold">
              <p className="primary-text-color">Sáng Tạo</p>
              <p className="primary-text-color">Tự Học</p>
              <p className="primary-text-color">Làm Chủ Kiến Thức </p>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2">
              <div className="flex  items-center justify-center">
                <img
                  src="/assets/students/Slide 4/Slide 4.1.png"
                  alt="Slide 4.1.png"
                  className="w-35"
                />
                <span className="text-4xl primary-text-color">
                  Cá nhân hóa lộ trình học tập
                </span>
              </div>
              <div className="mx-auto">
                <img
                  src="/assets/students/Slide 4/Slide 4.5.png"
                  alt=""
                  className="w-2/7 mx-auto"
                />
              </div>

              <div className="flex  items-center justify-center">
                <img
                  src="/assets/students/Slide 4/Slide 4.3.png"
                  alt="Slide 4.3.png"
                  className="w-35"
                />
                <span className="text-4xl primary-text-color">
                  Học tập qua trò chơi
                </span>
              </div>
              <div className="mx-auto">
                <img
                  src="/assets/students/Slide 4/Slide 4.7.png"
                  alt=""
                  className="w-2/7 mx-auto"
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex  items-center justify-center">
                <img
                  src="/assets/students/Slide 4/Slide 4.2.png"
                  alt="Slide 4.2.png"
                  className="w-35"
                />
                <span className="text-4xl primary-text-color">
                  Nhạc hóa kiến thức
                </span>
              </div>
              <div className="mx-auto">
                <img
                  src="/assets/students/Slide 4/Slide 4.6.png"
                  alt=""
                  className="w-2/7 mx-auto"
                />
              </div>

              <div className="flex  items-center justify-center">
                <img
                  src="/assets/students/Slide 4/Slide 4.4.png"
                  alt="Slide 4.1.png"
                  className="w-35"
                />
                <span className="text-4xl primary-text-color">
                  Bảng xếp hạng học tập
                </span>
              </div>
              <div className="mx-auto">
                <img
                  src="/assets/students/Slide 4/Slide 4.8.png"
                  alt=""
                  className="w-2/7 mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function Section4() {
  return (
    <>
      <div className="h-full mx-10 flex items-end justify-between relative">
        <div className="text-center w-full">
          <div className="mb-1">
            <h1 className="text-6xl primary-text-color">
              Chuẩn kiến thức cùng
              <br />
              GV Ngôi Sao Hoàng Mai
            </h1>
          </div>
          <div className="flex">
            <div>
              <img
                src="/assets/students/Slide 5/Slide 5.1.png"
                alt=""
                className="w-90"
              />
              <div className="w-fit mx-auto text-left m-2 ml-20">
                <p className=" text-3xl primary-text-color">Giáo viên</p>
                <p className=" text-3xl primary-text-color">Lê Thị Thu Trang</p>
                <p className="bg-red-200 inline-block p-1 primary-text-color text-xl">
                  Creative Project Lead
                </p>
                <ul className="list-disc primary-text-color mx-4">
                  <li>Thạc sĩ Giáo dục học</li>
                  <li>
                    Cử nhân bằng Giỏi SP
                    <br />
                    Toán Tiếng Anh
                  </li>
                  <li>Top 10 AI Super Teacher 2025</li>
                </ul>
              </div>
            </div>

            <div>
              <img
                src="/assets/students/Slide 5/Slide 5.2.png"
                alt=""
                className="w-90"
              />
              <div className="w-fit mx-auto text-left m-2 ml-20">
                <p className=" text-3xl primary-text-color">Giáo viên</p>
                <p className=" text-3xl primary-text-color">Bùi Thu Trang</p>
                <p className="bg-red-200 inline-block p-1 primary-text-color text-xl">
                  Web Developer
                </p>
                <ul className="list-disc primary-text-color mx-4">
                  <li>Cử nhân SP Tin học Top</li>
                  <li>Top 10 AI Super Teacher 2025</li>
                </ul>
              </div>
            </div>

            <div>
              <img
                src="/assets/students/Slide 5/Slide 5.3.png"
                alt=""
                className="w-90"
              />
              <div className="w-fit mx-auto text-left m-2 ml-20">
                <p className=" text-3xl primary-text-color">Giáo viên</p>
                <p className=" text-3xl primary-text-color">Nguyễn Thị Lan</p>
                <p className="bg-red-200 inline-block p-1 primary-text-color text-xl">
                  UI/UX Designer
                </p>
                <ul className="list-disc primary-text-color mx-4">
                  <li>
                    Cử nhân bằng Xuất sắc
                    <br />
                    SP Vật Lí Tiếng Anh
                  </li>
                  <li>Top 4 AI Super Teacher 2025</li>
                </ul>
              </div>
            </div>

            <div>
              <img
                src="/assets/students/Slide 5/Slide 5.4.png"
                alt=""
                className="w-90"
              />
              <div className="w-fit mx-auto text-left m-2 ml-20">
                <p className=" text-3xl primary-text-color">Giáo viên</p>
                <p className=" text-3xl primary-text-color">Trịnh Minh Dung</p>
                <p className="bg-red-200 inline-block p-1 primary-text-color text-xl">
                  Academic Advisor
                </p>
                <ul className="list-disc primary-text-color mx-4">
                  <li>
                    Cử nhân bằng Giỏi SP
                    <br />
                    Vật Lí Tiếng Anh
                  </li>
                  <li>Top 4 AI Super Teacher 2025</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function Section5() {
  // xử lí form đăng kí
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    className: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.fullName ||
      !formData.birthDate ||
      !formData.className ||
      !formData.username ||
      !formData.password
    ) {
      setMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (formData.password.length < 6) {
      setMessage("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    // Xử lý đăng ký (giả lập)
    console.log("Đăng ký thành công:", formData);
    setMessage("Đăng ký thành công! 🎉");

    // Reset form sau 2 giây
    setTimeout(() => {
      setFormData({
        fullName: "",
        birthDate: "",
        className: "",
        username: "",
        password: "",
      });
      setMessage("");
    }, 2000);
  };
  return (
    <>
      <div className="h-full mx-10 flex items-end justify-between relative">
        <div className="max-w-4xl mx-auto">
          <div className="mb-5 text-center">
            <h1 className="text-6xl primary-text-color">Đăng Kí</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-8 ">
              <label className="primary-text-color text-2xl w-48">Họ tên</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full flex-1 px-40 py-4 rounded-full border-3 border-orange-400 bg-white focus:outline-none focus:border-orange-500 text-lg"
              />
            </div>

            <div className="flex items-center gap-8">
              <label className="primary-text-color text-2xl w-48">
                Ngày sinh
              </label>
              <input
                type="text"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="flex-1 px-40 py-4 rounded-full border-3 border-orange-400 bg-white focus:outline-none focus:border-orange-500 text-lg"
              />
            </div>

            <div className="flex items-center gap-8">
              <label className="primary-text-color text-2xl w-48">Lớp</label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="flex-1 px-40 py-4 rounded-full border-3 border-orange-400 bg-white focus:outline-none focus:border-orange-500 text-lg"
              />
            </div>

            <div className="flex items-center gap-8">
              <label className="primary-text-color text-2xl w-48">
                Tên đăng nhập
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="flex-1 px-40 py-4 rounded-full border-3 border-orange-400 bg-white focus:outline-none focus:border-orange-500 text-lg"
              />
            </div>

            <div className="flex items-center gap-8">
              <label className="primary-text-color text-2xl w-48">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="flex-1 px-40 py-4 rounded-full border-3 border-orange-400 bg-white focus:outline-none focus:border-orange-500 text-lg"
              />
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-gradient-to-r bg-[#ef7131] text-white font-semibold text-xl px-30 py-5 ml-10 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg mb-10"
              >
                Đăng ký
              </button>
            </div>

            {message && (
              <div
                className={`text-center text-lg font-semibold ${
                  message.includes("thành công")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          {/* Decorative circle */}
          <div className="fixed bottom-8 right-8">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SmoothFullpageScroll() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    let scrollTimeout;

    const handleWheel = (e) => {
      if (isScrolling) return;

      e.preventDefault();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0 && currentSection < sections.length - 1) {
          // Scroll down
          setCurrentSection((prev) => prev + 1);
          setIsScrolling(true);
        } else if (e.deltaY < 0 && currentSection > 0) {
          // Scroll up
          setCurrentSection((prev) => prev - 1);
          setIsScrolling(true);
        }
      }, 50);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isScrolling) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSection < sections.length - 1) {
          setCurrentSection((prev) => prev + 1);
          setIsScrolling(true);
        } else if (diff < 0 && currentSection > 0) {
          setCurrentSection((prev) => prev - 1);
          setIsScrolling(true);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      clearTimeout(scrollTimeout);
    };
  }, [currentSection, isScrolling]);

  useEffect(() => {
    if (isScrolling) {
      const timer = setTimeout(() => setIsScrolling(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isScrolling]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Sections */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.7,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className={`absolute inset-0 flex justify-centers`}
        >
          {sections[currentSection].backgroundUrl && (
            <img
              key={currentSection + "-bg"}
              src={sections[currentSection].backgroundUrl}
              alt="Section Background"
              className="absolute inset-0 w-full h-full 
                                object-contain object-bottom z-0"
            />
          )}

          <div className="absolute inset-0 z-10">
            {sections[currentSection].component}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
