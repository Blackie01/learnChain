"use client";
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Button from "../components/Button";
import { courses, networks } from "@/utils/constants";

const Dashboard = () => {
  const [balance] = useState(typeof window !== "undefined" && global?.localStorage?.getItem("balance"));
  const [chainId] = useState(typeof window !== "undefined" && global?.localStorage?.getItem("chainId"));
  const [network, setNetwork] = useState<string>("");

  useEffect(() => {
    if (chainId) {
      const parsedChainId = parseInt(chainId, 16);
      const chainIdToNetwork = networks[parsedChainId];
      setNetwork(chainIdToNetwork);
    }
  }, [chainId]);

  return (
    <section className="bg-[#1D1F24] text-[#fff] min-h-[100vh]">
      <Navigation />
      <div className="mt-[5rem] mx-[10rem] max-[774px]:mx-[2rem]">
        <div>
          <p className="text-[#C7F86F] font-bold">ETH Balance</p>
          <h2 className="text-[2.5rem]">{balance}</h2>
          <p className="text-sm">{network}</p>
        </div>

        <div className="bg-[#1D2832] p-[2rem] max-[500px]:p-[1rem] w-[40%] max-[1361px]:w-[60%] max-[1055px]:w-[100%] mt-[3rem] flex flex-col gap-[2rem]">
          <p className=" text-[#444F5D]">Courses to take</p>
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex justify-between items-center text-sm gap-[1rem]"
            >
              <p>{course.title}</p>
              <Button smallButton={true} textColor="#000">
                Start
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
