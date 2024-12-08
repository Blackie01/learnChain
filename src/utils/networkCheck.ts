export const isMetamaskInstalled = () => {
  return typeof window.ethereum !== "undefined";
};

export const checkBlockchainNetwork = async () => {
  const chainId = await window.ethereum.request({
    method: "eth_chainId",
  });
  return chainId;
};
