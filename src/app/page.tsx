"use client";
import React from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/Hero";
import { Eip1193Provider } from 'ethers';

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

export default function Home() {
  return (
    <div className="bg-[#030401] text-[#fff] min-h-[100vh]">
      <Navigation />
      <HeroSection />
    </div>
  );
}
