/* eslint-disable @next/next/no-img-element */
import React, { Context, ContextType, useEffect, useState } from "react";

import { ethers } from "ethers";
import { useRouter } from "next/router";
import Info from "../components/Info";
import Erc20Tokens from "../components/Erc20Tokens";
import Link from "next/link";
import Image from "next/image";
import Collection from "../components/Collection";
import Loader from "react-loader-spinner";
import {
  getEtherInfo,
  // getCollectibles,
  getAllErc20Tokens,
} from "./api/etherInfo";
import useTokenPrice from "../hooks/useTokenPrice";
import { motion } from "framer-motion";

type erc20TokenType = {
  balance: string;
  decimals: string;
  logo: string;
  name: string;
  symbol: string;
  thumbnail: string;
  token_address: string;
};

export default function EthInfo({
  balance,
  id,
  ens,
  data,
  erc20Data,
}: {
  balance: ethers.BigNumber;
  id: string;
  ens: string | null;
  data: [];
  erc20Data: [];
}) {
  const router = useRouter();

  const [collectibles, setCollectibles] = useState<any>([]);

  useEffect(() => {
    getCollectibles(id);
  }, [id]);

  useEffect(() => {
    console.log("erc20Data: ", erc20Data);
  }, [erc20Data]);
  if (id === null) {
    return (
      <div className="h-screen flex flex-col justify-center items-center gap-5 bg-gray-900 font-montserrat">
        <p className="text-white text-2xl">Nothing at this address.</p>
        <Link href="/">
          <a className="text-white underline">Go back?</a>
        </Link>
      </div>
    );
  }

  async function getCollectibles(id: string) {
    const network = "homestead";
    const provider = ethers.getDefaultProvider(network, {
      etherscan: process.env.ETHERSCAN_API,
    });
    let collectibles: any;
    try {
      const data = await fetch(
        `https://api.opensea.io/api/v1/assets?owner=${id}`
      );

      const response = await data.json();

      collectibles = response;
      setCollectibles(collectibles.assets);
    } catch (error) {
      console.error("get collectible: ", error);
      collectibles = null;
      return {
        collectibles,
      };
    }
  }

  return (
    <div className="h-screen w-5/6 mx-auto flex flex-col justify-start mt-32 gap-10 items-center ">
      <div className="flex w-3/6 bg-white rounded-xl justify-around items-center gap-5 font-poppins font-semibold">
        <Info
          name="address"
          info={`${id.substring(0, 4)}...${id.substr(id.length - 3)}`}
          buttonDisabled={false}
          onClickHandler={() => {
            navigator.clipboard.writeText(id);
          }}
          className="hover:text-[#CC3A88] cursor-pointer"
        />
        <Info name="ens" info={ens ? ens : "-"} />
        <Info
          name="balance"
          info={`${balance.toString().substring(0, 5)} eth`}
        />
      </div>
      <Collection heading="Tokens">
        {erc20Data &&
          erc20Data.map((data: erc20TokenType, index) => (
            <Erc20Tokens
              key={index}
              address={ethers.utils.getAddress(data.token_address)}
              balance={(
                parseInt(data.balance) /
                10 ** parseInt(data.decimals)
              ).toString()}
              symbol={data.symbol}
              name={data.name}
            />
          ))}
      </Collection>

      <Collection heading="Collection">
        {collectibles ? (
          collectibles.map((data: any) => (
            <div
              className="bg-gray-500 w-52 rounded-md overflow-hidden"
              key={data.id}
            >
              <img
                onClick={() => router.push(data.image_url)}
                className="h-full w-full cursor-pointer object-fill "
                src={data.image_url}
                alt="nft_image"
              />
            </div>
          ))
        ) : (
          <div>
            <Loader type="TailSpin" height={50} color="#6B7280" />
          </div>
        )}
      </Collection>

      <h1 className="text-center font-semibold text-tertiary">
        Build with ❤️ by{" "}
        <a href="https://github.com/miralsuthar">
          <span className="text-primary">miral</span>
        </a>
      </h1>
    </div>
  );
}

export async function getStaticPaths<GetStaticPaths>(address: string) {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps<GetStaticProps>(context: any) {
  let data;
  let erc20Data;
  // console.log("context: ", context.params.address);
  const { address } = context.params;
  const { ens, balance, id } = await getEtherInfo(address);
  if (id !== null) {
    // data = await getCollectibles(context);
    erc20Data = await getAllErc20Tokens(id);
  }

  return {
    props: {
      ens,
      balance,
      id,
      // data: data ? data?.collectibles : null,
      erc20Data: erc20Data ? erc20Data : null,
    },
  };
}
