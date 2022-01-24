import React from 'react';

type CollectionProps = {
  children: React.ReactNode;
  heading: string;
};
export default function Collection({ children, heading }: CollectionProps) {
  return (
    <div className="w-4/6 bg-gray-900 text-center rounded-md font-montserrat p-4">
      <h1 className="text-white text-2xl font-bold">{heading}</h1>
      <div className="mt-14 flex justify-around items-center flex-wrap gap-10">
        {children}
      </div>
    </div>
  );
}
