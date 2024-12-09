"use client";
import React, { useState } from "react";
import Button from "./Button";
import ConnectWallet from "./ConnectWallet";
import Link from "next/link";
import styles from "./navigation.module.css";

const Navigation = () => {
  const [walletAddress] = useState(
    () => (typeof window !== "undefined" && global?.localStorage?.getItem("walletAddress")) || "Connect wallet"
  );
  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  const handleConnectWalletModal = () => {
    setOpenConnectWallet(!openConnectWallet);
  };
  return (
    <div
      className={`${styles.navigation} w-full flex justify-between items-center`}
    >
      <Link href={"/"} className="text-[1.3rem]">
        Learnchain
      </Link>
      <Button
        onClick={handleConnectWalletModal}
        maxWidth={walletAddress == "Connect wallet" ? "" : "10rem"}
      >
        {walletAddress}
      </Button>

      <ConnectWallet
        openConnectWallet={openConnectWallet}
        setOpenConnectWallet={setOpenConnectWallet}
      />
    </div>
  );
};

export default Navigation;
