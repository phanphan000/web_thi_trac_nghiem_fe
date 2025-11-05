import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    className: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (onLogin) onLogin();
    navigate("/test");
    console.log("Đăng nhập:", formData);
    setMessage("Đăng nhập thành công! 🎉");

    setTimeout(() => {
      setFormData({
        username: "",
        className: "",
        password: "",
      });
      setMessage("");
    }, 2000);
  };
  return (
    <div className="h-full mx-10 flex justify-between pt-50 items-center">
      <img
        src="/assets/students/Slide 2/Slide 2.3.png"
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
      />
      <div className="max-w-4xl mx-auto z-10">
        <div className="text-center mb-10">
          <h1 className="text-6xl primary-text-color">Đăng Nhập</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-8 mr-15">
          {/* Tên đăng nhập */}
          <div className="flex items-center gap-8">
            <label className="primary-text-color text-2xl w-48">
              Tên đăng nhập
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="px-20 py-4 text-center rounded-full border-2 border-orange-400 bg-white focus:outline-none focus:border-orange-500 text-lg w-[500px]"
            />
          </div>

          {/* Mật khẩu */}
          <div className="flex items-center gap-8">
            <label className="primary-text-color text-2xl w-48">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="px-20 py-4 text-center rounded-full border-2 border-orange-400 bg-white focus:outline-none focus:border-orange-500 text-lg w-[500px]"
            />
          </div>

          {/* Nút đăng nhập */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLogin}
              className="bg-[#ef7131] text-white font-semibold text-xl px-20 py-5 rounded-full cursor-pointer hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg mb-10"
            >
              Đăng nhập
            </button>
          </div>

          {/* Thông báo */}
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
      </div>
    </div>
  );
};

export default Login;
