import React from "react";
import splashImage from "../assets/splash.jpeg";

const SplashPage = () => {
  return (
    <div className="h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-start p-12">
        <h1 className="text-3xl font-bold mb-4">project name</h1>
        <p className="text-xl mb-2">tagline</p>
        <p className="text-gray-600 mb-8">short intro</p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded">login</button>
          <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded">enter</button>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${splashImage})`
        }}
      ></div>
    </div>
  );
};

export default SplashPage;
