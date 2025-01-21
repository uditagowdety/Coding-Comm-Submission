import React from "react";
import { Routes, Route } from "react-router-dom";
import SplashPage from "./components/Splash/Splash";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Register/Register";
import HomePage from "./components/Home/Home";
import TheoryPage from "./components/Theory/Theory";
import PracticePage from "./components/Practice/Practice";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<h1>Dashboard Placeholder</h1>} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/theory/:id" element={<TheoryPage />} />
      <Route path="/practice/:id" element={<PracticePage />} />
    </Routes>
  );
};

export default App;
