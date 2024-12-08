"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { ethers } from "ethers";
import { usePathname, useRouter } from "next/navigation";
import {
  checkBlockchainNetwork,
  isMetamaskInstalled,
} from "@/utils/networkCheck";
import Link from "next/link";

interface ConnectWalletProps {
  openConnectWallet: boolean;
  setOpenConnectWallet: (value: React.SetStateAction<boolean>) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({
  openConnectWallet,
  setOpenConnectWallet,
}) => {
  const router = useRouter();
  const pathname = usePathname()
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connectedWalletAddress] = useState(() =>
    localStorage.getItem("walletAddress")
  );

  useEffect(() => {
    const authGuard = () => {
      if (!connectedWalletAddress) {
        router.push("/");
        return;
      }
    };
    authGuard();
  }, []);

  const connectMetamask = async () => {
    if (!isMetamaskInstalled()) {
      alert("Metamask is not installed");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const address = accounts[0];
      setWalletAddress(address);
      localStorage.setItem("walletAddress", address);

      const provider = new ethers.BrowserProvider(window.ethereum);

      const balance = await provider.getBalance(address);

      const balanceInEth = ethers.formatEther(balance);
      setBalance(parseFloat(balanceInEth).toFixed(4));
      localStorage.setItem("balance", parseFloat(balanceInEth).toFixed(4));

      const chainId = await checkBlockchainNetwork();
      localStorage.setItem("chainId", chainId);

      router.push("/dashboard");
    } catch (error) {
      alert("There is an error, please try again.");
      router.push("/");
    }
  };

  const clearWalletState = () => {
    setWalletAddress(null);
    localStorage.setItem("walletAddress", "");
    setBalance(null);
    localStorage.setItem("balance", "");
    setError(null);
  };

  const disconnectWallet = () => {
    clearWalletState();
    if (pathname === '/') {
      window.location.reload();
    } else {
      router.push('/');
    }
  };

  const connectTrustWallet = () => {};
  const connectPhantom = () => {};
  const connectLedger = () => {};

  const walletTypes = [
    {
      id: 1,
      walletName: "Metamask",
      walletLogo: "",
      function: connectMetamask,
      integrationStatus: "complete",
    },
    {
      id: 2,
      walletName: "Trust wallet",
      walletLogo: "",
      function: connectTrustWallet,
      integrationStatus: "pending",
    },
    {
      id: 3,
      walletName: "Phantom",
      walletLogo: "",
      function: connectPhantom,
      integrationStatus: "pending",
    },
    {
      id: 4,
      walletName: "Ledger",
      walletLogo: "",
      function: connectLedger,
      integrationStatus: "pending",
    },
  ];

  const [copyText, setCopyText] = useState("Copy");
  const copyAddress = () => {
    if (!connectedWalletAddress) {
      return;
    }
    navigator.clipboard.writeText(connectedWalletAddress ?? "");
    setCopyText("Copied");
    setTimeout(() => {
      setCopyText("Copy");
    }, 2000);
  };

  const ConnectedWalletActions = () => {
    return (
      <div>
        <div>
          <p className="text-xs text-[#deddd9]">Connected wallet</p>
          <p className="flex justify-between">
            <span className="truncate">{connectedWalletAddress}</span>
            <span className="text-sm" onClick={copyAddress}>
              {copyText}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-[1rem] my-[2rem]">
          <Button onClick={disconnectWallet}>Disconnect wallet</Button>
        </div>

        <Link href={"/dashboard"} className="text-sm hover:cursor-pointer">
          Go to dashboard
        </Link>
      </div>
    );
  };

  return (
    <Modal openModal={openConnectWallet} setOpenModal={setOpenConnectWallet}>
      {!connectedWalletAddress ? (
        <div className="flex text-[14px] gap-[5%] max-[600px]:flex-col">
          <div className="w-[60%] max-[600px]:w-full">
            <h1 className="text-[1.2rem] mb-2">Connect Wallet</h1>
            <p>Start your journey with Learnchain</p>

            <div className="my-8 w-full flex flex-col gap-4">
              {walletTypes.map((wallet, index) => (
                <div key={index} className="flex w-full justify-between">
                  <p className={`${wallet.integrationStatus === 'pending' && 'text-[#8c8382]'}`}>
                    {wallet.walletName}
                    <span className="text-[10px] text-[green] ml-2">
                      {wallet.integrationStatus === "pending" && "Coming soon"}
                    </span>
                  </p>
                  <Button
                    onClick={wallet.function}
                    smallButton={true}
                    disable={wallet.integrationStatus === "pending" && true}
                    textColor="#000"
                  >
                    Connect
                  </Button>
                </div>
              ))}
            </div>

            <p>Read more about Learnchain.</p>
          </div>
          <div className="w-[35%] max-[600px]:w-full h-full bg-[#F8F9F8]">

          </div>
        </div>
      ) : (
        <ConnectedWalletActions />
      )}
    </Modal>
  );
};

export default ConnectWallet;