/* eslint-disable @next/next/no-img-element */
import React, { Context, ContextType, useEffect } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import Info from '../components/Info';
import Link from 'next/link';
import Image from 'next/image';
import Collection from '../components/Collection';
import { getEtherInfo, getCollectibles } from './api/etherInfo';
import { AppContext } from 'next/app';

export default function EthInfo({
  balance,
  id,
  ens,
  data,
}: {
  balance: ethers.BigNumber;
  id: string;
  ens: string | null;
  data: [];
}) {
  const router = useRouter();
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
  return (
    <div className="h-screen w-5/6 mx-auto flex flex-col justify-start mt-32 gap-10 items-center">
      <Link href="/">
        <a className="text-white w-4/6">{'<Go back'}</a>
      </Link>
      <div className="flex justify-center items-center gap-5">
        <Info
          name="address"
          info={`${id.substring(0, 6)}...${id.substr(id.length - 4)}`}
          buttonDisabled={false}
          onClickHandler={() => {
            navigator.clipboard.writeText(id);
          }}
        >
          <Image height="30" width="30" src="/copy.png" alt="copy" />
        </Info>
        <Info name="ens" info={ens ? ens : '-'} />
        <Info
          name="balance"
          info={`${balance.toString().substring(0, 8)} ETH`}
        />
      </div>
      <Collection>
        {data &&
          data.map((data: any) => (
            <div
              className="bg-gray-500 h-96 flex flex-col gap-2 rounded-md overflow-hidden shadow-nftShadow"
              key={data.id}
            >
              <img
                onClick={() => router.push(data.image_url)}
                className="h-5/6 w-full cursor-pointer "
                src={data.image_url}
                alt="nft_image"
              />
              <p className="text-black font-bold text-2xl">{data.name}</p>
            </div>
          ))}
      </Collection>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  let data;
  const { address } = context.query;
  const { ens, balance, id } = await getEtherInfo(address);
  if (id !== null) {
    data = await getCollectibles(context);
  }

  return {
    props: {
      ens,
      balance,
      id,
      data: data ? data?.collectibles : null,
    },
  };
}
