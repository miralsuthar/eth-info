import { ethers } from "ethers";
import { request } from "https";
require("dotenv").config();

export async function getEtherInfo(address: string) {
  let balance: ethers.BigNumber;
  let id: string | null;
  let ens: string | null;
  const network = "homestead";
  try {
    const provider = ethers.getDefaultProvider(network, {
      etherscan: process.env.ETHERSCAN_API,
    });
    balance = await provider.getBalance(address);
    id = await provider.resolveName(address);
    ens = await provider.lookupAddress(id ? id : "-");
    return {
      balance: ethers.utils.formatEther(balance),
      id,
      ens,
    };
  } catch (e) {
    console.log("ethInfo: ", e);
    return {
      balance: null,
      id: null,
      ens: null,
    };
  }
}

// export async function getCollectibles(context: any) {
//   const { address } = context.query;
//   const network = "homestead";
//   const provider = ethers.getDefaultProvider(network, {
//     etherscan: process.env.ETHERSCAN_API,
//   });
//   let collectibles: any;
//   const id = await provider.resolveName(address);
//   try {
//     const data = await fetch(
//       `https://api.opensea.io/api/v1/assets?owner=${id}`,
//       {
//         headers: {
//           "User-Agent": context.req.headers["user-agent"],
//         },
//       }
//     );

//     const response = await data.text();

//     collectibles = response;
//     console.log("Collectibles: ", collectibles);
//     return {
//       collectibles,
//     };
//   } catch (error) {
//     console.error("get collectible: ", error);
//     collectibles = null;
//     return {
//       collectibles,
//     };
//   }
// }

export async function getAllErc20Tokens(address: string) {
  const reponse = await fetch(
    `https://deep-index.moralis.io/api/v2/${address}/erc20?chain=eth`,
    {
      // @ts-ignore
      headers: {
        "X-API-KEY": process.env.DEEPINDEX_API_KEY,
      },
    }
  );
  const data = await reponse.json();
  return data;
}
