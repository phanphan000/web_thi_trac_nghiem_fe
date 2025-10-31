import React from "react";
import { Link } from "react-router-dom";

const tools = [
  {
    id: "1",
    name: "Quiz",
    link: "#",
    image: "/assets/students/Slide 10/slide 10.1.png",
  },
  {
    id: "2",
    name: "Game",
    link: "#",
    image: "/assets/students/Slide 10/slide 10.2.png",
  },
  {
    id: "3",
    name: "Music",
    link: "#",
    image: "/assets/students/Slide 10/slide 10.3.png",
  },
];

export default function ToolDetail() {
  return (
    <div className="flex flex-col items-center p-8 justify-center min-h-screen pt-30 primary-text-color">
      <h1 className="text-6xl mb-4 ">HÔM NAY BẠN MUỐN HỌC THEO CÁCH NÀO?</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        {tools.map((tool) => (
          <div key={tool.id} className="flex flex-col items-center  m-5">
            <img
              src={tool.image}
              alt={tool.name}
              className="w-110 object-contain hover:scale-105 transition-transform duration-200"
            />
            <Link
              to={tool.link}
              className="text-black text-4xl font-bold hover:text-[var(--color-primary)]"
            >
              {tool.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
