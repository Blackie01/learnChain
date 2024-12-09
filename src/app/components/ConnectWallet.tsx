"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { Eip1193Provider, ethers } from "ethers";
import { usePathname, useRouter } from "next/navigation";
import {
  checkBlockchainNetwork,
  isMetamaskInstalled,
} from "@/utils/networkCheck";
import Link from "next/link";
import Loader from "./Loader";

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
  const [connectedWalletAddress] = useState(typeof window !== "undefined" && global?.localStorage?.getItem("walletAddress"));
  const [loadingState, setLoadingState] = useState(false)

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
    setLoadingState(true)
    if (!isMetamaskInstalled()) {
      setLoadingState(false)
      alert("Metamask is not installed");
      return;
    }

    try {
      const accounts = await window.ethereum?.request({
        method: "eth_requestAccounts",
      });

      const address = accounts[0];
      localStorage.setItem("walletAddress", address);
    
      const provider = new ethers.BrowserProvider(window.ethereum as Eip1193Provider);

      const balance = await provider.getBalance(address);

      const balanceInEth = ethers.formatEther(balance);
      localStorage.setItem("balance", parseFloat(balanceInEth).toFixed(4));

      const chainId = await checkBlockchainNetwork();
      localStorage.setItem("chainId", chainId);

      router.push("/dashboard");
      setLoadingState(false)
    } catch (error) {
      alert("There is an error, please try again.");
      console.error(error)
      router.push("/");
      setLoadingState(false)
    }
  };

  const clearWalletState = () => {
    localStorage.setItem("walletAddress", "");
    localStorage.setItem("balance", "");
  };

  const disconnectWallet = () => {
    setLoadingState(true)
    clearWalletState();
    if (pathname === '/') {
      setLoadingState(false)
      window.location.reload();
    } else {
      router.push('/');
      setLoadingState(false)
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
      <div className="relative">
      {loadingState && <div className="absolute -top-[1.5rem] left-[50%]"><Loader/></div>}
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
      </div>
    </Modal>
  );
};

export default ConnectWallet;
