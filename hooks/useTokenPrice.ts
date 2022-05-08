import { useEffect, useState } from "react";
// require("dotenv").config();

export default function useTokenPrice(address: string) {
  const [price, setPrice] = useState<number>(0);
  const fetchData = async (address: string) => {
    const data = await fetch(
      `https://deep-index.moralis.io/api/v2/erc20/${address}/price?chain=eth`,
      {
        // @ts-ignore
        headers: {
          "X-API-KEY":
            "irUgVG4WtUzg9XSRhpewjOu8hAtkbzQgjyk2p2M3YHYXuJEQbHv3p2bsI4KXURLr",
        },
      }
    );

    const response = await data.json();

    setPrice(response.usdPrice);
  };
  useEffect(() => {
    fetchData(address);
  }, [address]);

  console.log("token price", price);

  return price;
}
