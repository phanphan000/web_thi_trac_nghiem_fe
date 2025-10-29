import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Test from "./pages/students/test/index";
import Instructions from "./pages/students/test/instructions";
import Exam from "./pages/students/test/exam";
import Header from "./components/Header";

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
          <Route path="/login" element={<Login onLogin={handleLogin} />} />{" "}
          <Route path="/test" element={<Test />} />
          <Route path="/test/instructions" element={<Instructions />} />
          <Route path="/test/exam" element={<Exam />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
