import React, { Children } from "react";

type InfoProps = {
  name: string;
  info: string;
  onClickHandler?: () => void;
  buttonDisabled?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export default function Info({
  name,
  info,
  onClickHandler,
  buttonDisabled = true,
  children,
  className,
}: InfoProps) {
  return (
    <div className="w-max p-3 flex flex-col gap-2 justify-center items-center font-poppins font-semibold px-4 rounded-md">
      <p className="px-2 text-sm py-1 text-gray rounded-md font-semibold w-max">
        {name}
      </p>

      <div className="flex gap-4">
        <p
          className={`text-primary font-bold text-base ${className}`}
          onClick={onClickHandler}
        >
          {info}
        </p>
      </div>
    </div>
  );
}
