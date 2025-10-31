import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StarCursorProvider = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([]);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState([]);

  const cursorColor = "#FFD700";

  // Track mouse position
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add trail
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random(),
      };

      setTrails((prev) => [...prev.slice(-6), newTrail]);
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      // Create particles on click
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        angle: (i * 360) / 8,
      }));
      setParticles(newParticles);
    };

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

  // Apply CSS cursor
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "star-cursor-style";
    style.innerHTML = `
      * {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="%23FFD700" stroke="%23FFA500" stroke-width="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>') 14 14, auto !important;
      }
      button, a, [role="button"], .cursor-pointer, input[type="button"], input[type="submit"], select {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="%23FFD700" stroke="%23FFA500" stroke-width="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>') 16 16, pointer !important;
      }
      input[type="text"], input[type="email"], input[type="password"], textarea {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="%23FFD700" stroke="%23FFA500" stroke-width="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>') 14 14, text !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById("star-cursor-style");
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  return (
    <>
      {/* Cursor Trails */}
      <AnimatePresence>
        {trails.map((trail, index) => {
          const opacity = ((index + 1) / trails.length) * 0.6;
          const size = 12 + (index / trails.length) * 8;

          return (
            <motion.div
              key={trail.id}
              className="fixed pointer-events-none z-[9999]"
              style={{
                left: trail.x,
                top: trail.y,
                x: "-50%",
                y: "-50%",
              }}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                style={{ opacity }}
              >
                <path
                  fill={cursorColor}
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Click Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: particle.x,
              top: particle.y,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: Math.cos((particle.angle * Math.PI) / 180) * 50,
              y: Math.sin((particle.angle * Math.PI) / 180) * 50,
              opacity: 0,
              scale: 0.5,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: cursorColor }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Click Ring Effect */}
      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-[9999] rounded-full border-4"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            x: "-50%",
            y: "-50%",
            borderColor: cursorColor,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-8" />
        </motion.div>
      )}

      {children}
    </>
  );
};

export default StarCursorProvider;
