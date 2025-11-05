import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, onLogout, onRegisterClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout(); // gọi hàm cha xử lý đăng xuất
    navigate("/"); // điều hướng về trang chủ
  };

  const handleRegisterClick = () => {
    navigate("/", { state: { scrollToSection: 5 } });
    if (onRegisterClick) onRegisterClick();
  };

  return (
    <header className="bg-[var(--color-background)] fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-8 h-30 overflow-hidden">
      <div className="w-100 cursor-pointer mx-4 ml-8">
        <Link to="/">
          <img src="/assets/students/Slide 2/Slide 2.1.png" alt="logo" />
        </Link>
      </div>
      <div className="px-10 mx-6 items-center container">
        {/* Nếu chưa đăng nhập */}
        {!isLoggedIn ? (
          <nav className="flex gap-4 justify-end mt-5">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center justify-center py-6 px-16 rounded-4xl font-bold text-2xl
           bg-[#ffecca] text-[var(--color-secondary)] shadow-md cursor-pointer hover:scale-103 transition-transform"
            >
              Đăng nhập
            </button>
            <button
              onClick={handleRegisterClick}
              className="flex items-center justify-center py-6 px-12 rounded-4xl font-bold text-2xl
           bg-[var(--color-secondary)] text-white shadow-md cursor-pointer hover:scale-103 transition-transform"
            >
              Đăng ký ngay <ArrowRight size={25} />
            </button>
          </nav>
        ) : (
          // Nếu đã đăng nhập
          <nav className="flex items-center gap-20 justify-end text-2xl primary-text-color">
            <Link to="/test" className="hover:text-[var(--color-secondary)]">
              Test
            </Link>
            <Link
              to="/subjects"
              className="hover:text-[var(--color-secondary)]"
            >
              Môn học
            </Link>
            <Link to="/tool" className="hover:text-[var(--color-secondary)]">
              Công cụ
            </Link>
            <Link to="/results" className="hover:text-[var(--color-secondary)]">
              Kết quả
            </Link>
            <div className="flex items-center justify-center">
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded transition hover:text-[var(--color-secondary)] cursor-pointer"
              >
                Đăng xuất
              </button>
              <div className="rounded-full">
                <img
                  src="/assets/students/Slide 2/Slide 2.1.png"
                  alt=""
                  className="w-20"
                />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
