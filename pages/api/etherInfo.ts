import { ethers } from 'ethers';

export async function getEtherInfo(address: string) {
  let balance: ethers.BigNumber;
  let id: string | null;
  let ens: string | null;
  try {
    const provider = ethers.getDefaultProvider();
    balance = await provider.getBalance(address);
    id = await provider.resolveName(address);
    ens = await provider.lookupAddress(id ? id : '-');
    return {
      balance: ethers.utils.formatEther(balance),
      id,
      ens,
    };
  } catch (e) {
    console.log('ethInfo: ', e);
    return {
      balance: null,
      id: null,
      ens: null,
    };
  }
}

export async function getCollectibles(address: string) {
  const data = await fetch(
    `https://api.opensea.io/api/v1/assets?owner=${address}`
  );
  const res = await data.json();
  const collectibles = res.assets;
  return {
    collectibles,
  };
}
