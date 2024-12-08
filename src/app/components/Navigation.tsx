"use client";
import React, { useState } from "react";
import Button from "./Button";
import ConnectWallet from "./ConnectWallet";
import Link from "next/link";
import styles from "./navigation.module.css";

const Navigation = () => {
  const [walletAddress] = useState(
    () => localStorage.getItem("walletAddress") || "Connect wallet"
  );
  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  const handleConnectWalletModal = () => {
    setOpenConnectWallet(!openConnectWallet);
  };
  return (
    <section
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
    </section>
  );
};

export default Navigation;
