import React from "react";
import { Routes, Route } from "react-router-dom";
import SplashPage from "./components/Splash/Splash";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Register/Register";
import HomePage from "./components/Home/Home";
import TheoryPage from "./components/Theory/Theory";
import PracticePage from "./components/Practice/Practice";
import CodingPage from "./components/Coding/Coding";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/theory" element={<TheoryPage />} />
      <Route path="/practice" element={<PracticePage />} />
      <Route path="/coding" element={<CodingPage />} />
    </Routes>
  );
};

export default App;
