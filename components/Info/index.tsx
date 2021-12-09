import React, { Children } from 'react';

type InfoProps = {
  name: string;
  info: string;
  onClickHandler?: () => void;
  buttonDisabled?: boolean;
  children?: React.ReactNode;
};

export default function Info({
  name,
  info,
  onClickHandler,
  buttonDisabled = true,
  children,
}: InfoProps) {
  return (
    <div className="bg-gray-900  w-max p-3 flex flex-col gap-2 justify-center items-center font-montserrat px-4 rounded-md">
      <p className="bg-gray-500 px-2 py-1 rounded-md font-semibold w-max">
        {name}
      </p>

      <div className="flex gap-4">
        <p className="text-white font-bold text-2xl">{info}</p>
        {buttonDisabled ? null : (
          <button onClick={onClickHandler}>{children}</button>
        )}
      </div>
    </div>
  );
}
