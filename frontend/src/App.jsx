import React from "react";
import { Routes, Route } from "react-router-dom";
import SplashPage from "./components/Splash/Splash";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Register/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<h1>Dashboard Placeholder</h1>} />
    </Routes>
  );
};

export default App;
