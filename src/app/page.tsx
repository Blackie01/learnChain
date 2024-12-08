"use client";
import React from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/Hero";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Home() {
  return (
    <div className="bg-[#1D1F24] bg-[#030401] text-[#fff] min-h-[100vh]">
      <Navigation />
      <HeroSection />
    </div>
  );
}
