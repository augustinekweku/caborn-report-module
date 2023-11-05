"use client";
import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../public/assets/lottie/loading-green.json";

const InnerFullPageLoader = () => {
  return (
    <div
      style={{ height: "100%" }}
      className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center"
    >
      <Lottie
        loop={true}
        animationData={lottieJson}
        play
        style={{ width: 270, height: 270 }}
        className="z-50"
      />
    </div>
  );
};

export default InnerFullPageLoader;
