import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import StarCursorProvider from "./components/StartCursorProvider";
//import các layout
import MainLayout from "./layouts/MainLayout";
//import các trang
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
//import các trang học sinh-->tool
import Tool from "./pages/students/tool/ToolDetail";
//import các trang học sinh-->test
import Test from "./pages/students/test/index";
import Instructions from "./pages/students/test/instructions";
import Exam from "./pages/students/test/exam";
//import các trang học sinh-->subjects
import SubjectList from "./pages/students/subjects/SubjectList";
import LearningMethods from "./pages/students/subjects/LearningMethods";
//import các trang học sinh-->subjects-->math
import TopicMathMusicDetail from "./pages/students/subjects/math/music/TopicMathMusicDetail";
import TopicMathGameDetail from "./pages/students/subjects/math/game/TopicMathGameDetail";
// import các trang học sinh-->subjects-->tin
import TopicInforMusicDetail from "./pages/students/subjects/informatics/music/TopicInforMusicDetail";
import TopicInforGameDetail from "./pages/students/subjects/informatics/game/TopicInforGameDetail";
//import các trang học sinh-->subjects-->khoa học
import TopicScienceMusicDetail from "./pages/students/subjects/science/music/TopicScienceMusicDetail";
import TopicScienceGameDetail from "./pages/students/subjects/science/game/TopicScienceGameDetail";

function App() {
  const [goToSection, setGoToSection] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <StarCursorProvider>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            element={
              <MainLayout
                isLoggedIn={isLoggedIn}
                onLogin={() => setIsLoggedIn(true)}
                onLogout={() => setIsLoggedIn(false)}
                onRegisterClick={() => {
                  setGoToSection(4);
                  setTimeout(() => setGoToSection(null), 200);
                }}
              />
            }
          >
            <Route path="/" element={<Home goToSection={goToSection} />} />
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />}
            />{" "}
            {/* -------------------Route của test/ ----------------------------*/}
            <Route path="/test" element={<Test />} />
            <Route path="/test/instructions" element={<Instructions />} />
            <Route path="/test/exam" element={<Exam />} />
            {/* Route của----------------------- tool/----------------------------- */}
            <Route path="/tool" element={<Tool />} />
            {/*------------------- Route của subjects/ ----------------------------*/}
            <Route path="/subjects" element={<SubjectList />} />
            <Route path="/subjects/:subjectId" element={<LearningMethods />} />
            {/*------------------------- Route của math -----------------------------*/}
            <Route
              path="/subjects/math/music"
              element={<TopicMathMusicDetail />}
            ></Route>
            <Route
              path="/subjects/math/game"
              element={<TopicMathGameDetail />}
            ></Route>
            {/* ----------------------------Route của tin học ---------------------------------*/}
            <Route
              path="/subjects/informatics/music"
              element={<TopicInforMusicDetail />}
            ></Route>
            <Route
              path="/subjects/informatics/game"
              element={<TopicInforGameDetail />}
            ></Route>
            {/*--------------------------- Route của khoa học ----------------------------------*/}
            <Route
              path="/subjects/science/music"
              element={<TopicScienceMusicDetail />}
            ></Route>
            <Route
              path="/subjects/science/game"
              element={<TopicScienceGameDetail />}
            ></Route>
          </Route>
        </Routes>
      </StarCursorProvider>
    </Router>
  );
}

export default App;
