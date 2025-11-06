// ArrowCursorProvider.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ArrowCursorProvider = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const cursorColor = "#1E90FF";

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "arrow-cursor-style";
    const svgCursor = encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32">
        <path fill="#1E90FF" stroke="white" stroke-width="1.5" d="M2 2 L2 26 L10 21 L14 30 L18 28 L14 18 L22 13 Z"/>
      </svg>
    `);

    style.innerHTML = `
      * {
        cursor: url('data:image/svg+xml;utf8,${svgCursor}') 4 4, auto !important;
      }
      button, a, [role="button"], .cursor-pointer, input[type="button"], input[type="submit"], select {
        cursor: url('data:image/svg+xml;utf8,${svgCursor}') 4 4, pointer !important;
      }
      input[type="text"], input[type="email"], input[type="password"], textarea {
        cursor: url('data:image/svg+xml;utf8,${svgCursor}') 4 4, text !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById("arrow-cursor-style");
      if (existingStyle) document.head.removeChild(existingStyle);
    };
  }, [cursorColor]);

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          x: "-4px",
          y: "-4px",
        }}
        animate={{ scale: isClicking ? 0.8 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      ></motion.div>

      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-[9998] rounded-full border-2"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            x: "-15px",
            y: "-15px",
            borderColor: cursorColor,
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-8 h-8" />
        </motion.div>
      )}

      {children}
    </>
  );
};

export default ArrowCursorProvider;
