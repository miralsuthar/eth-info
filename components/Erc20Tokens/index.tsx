/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

type Erc20TokensProps = {
  address: string;
  balance: string;
  symbol: string;
};

export default function Erc20Tokens({
  balance,
  symbol,
  address,
}: Erc20TokensProps) {
  const [isImage, setIsImage] = useState(false);
  // const getSymbol = (address: string) => {
  //   let symbol: string;
  //   try {
  //     symbol = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
  //     return symbol;
  //   } catch (error) {
  //     console.error(error);
  //     setIsImage(false);
  //   }
  // };
  return (
    <div className="flex justify-between  w-full p-6 font-montserrat rounded-md bg-black">
      <div className="flex flex-col gap-2">
        {isImage ? (
          <img
            className="h-10 w-10"
            src={'null'}
            alt="/think.png"
            onError={() => setIsImage(false)}
          />
        ) : (
          <img className="h-10 w-10" src="./think.png" alt="think" />
        )}
        <h1 className="font-extrabold text-white">{symbol}</h1>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white">{balance}</h1>
      </div>
    </div>
  );
}
