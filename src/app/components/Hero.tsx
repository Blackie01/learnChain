"use client";
import React from "react";

const HeroSection = () => {
  return (
    <section className="w-[80%] text-center m-auto mt-[6rem] max-[1221px]:w-[90%]">
      <h1 className="text-[4rem] max-[679px]:text-[3rem] max-[500px]:text-[2.5rem]">
        Learn to earn at your convenience
      </h1>
      <p className="w-[55%] max-[1221px]:w-[70%] max-[500px]:w-[100%] m-auto mt-[1rem] text-[#989997] text-[1.2rem] max-[500px]:text-[1rem] text-center">
        Dive into blockchain technology and earn valuable rewards as you learn,
        grow, and explore the decentralized world.
      </p>
      <div className="pointer-events-none flex justify-center">
        <iframe
          src="https://giphy.com/embed/L59aKIC2MFyfUfrz3n"
          width="343"
          height="480"
          allowFullScreen
        ></iframe>
        <p>
          <a href="https://giphy.com/gifs/ethereum-eth-polyblock-L59aKIC2MFyfUfrz3n"></a>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
