/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

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
  const [isImage, setIsImage] = useState(true);
  return (
    <div className="flex justify-between  w-full p-6 font-montserrat rounded-md bg-black">
      <div className="flex flex-col gap-2">
        {isImage ? (
          <img
            className="h-10 w-10"
            src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`}
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
