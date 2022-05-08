/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import useTokenPrice from "../../hooks/useTokenPrice";

type Erc20TokensProps = {
  address: string;
  balance: string;
  symbol: string;
  name: string;
};

export default function Erc20Tokens({
  balance,
  symbol,
  address,
  name,
}: Erc20TokensProps) {
  const [isImage, setIsImage] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>("./think.png");

  const getSymbol = (address: string) => {
    try {
      let symbol = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      setImageUrl(symbol);
      setIsImage(true);
      console.log(symbol);
    } catch (error) {
      console.error(error);
      setIsImage(false);
    }
  };

  useEffect(() => {
    getSymbol(address);
  }, [address]);

  const price = useTokenPrice(address);

  return (
    <div className="flex justify-between  w-full p-6 font-poppins rounded-md bg-black">
      <div className="flex gap-2 justify-center items-center drop-shadow-xl">
        <img
          className="h-10 w-10 rounded-full"
          src={isImage ? imageUrl : "./think.png"}
          alt="logo"
          onError={() => setIsImage(false)}
        />

        <div className="flex flex-col justify-center items-start">
          <h1 className="font-extrabold">{symbol}</h1>
          <p>{name}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-end">
        <h1 className="text-xl font-bold">{balance}</h1>
        <p>${(parseInt(balance) * price).toString().substring(0, 5)}</p>
      </div>
    </div>
  );
}
