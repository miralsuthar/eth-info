import React, { ReactComponentElement } from "react";

type InputProps = {
  input: string;
  setInput: (input: string) => void;
  onClickFunction: (e: React.MouseEvent) => void;
  disabled: boolean;
};

export default function Input({
  input,
  setInput,
  onClickFunction,
  disabled,
}: InputProps) {
  return (
    <div className="w-3/4 sm:w-3/6 font-montserrat flex flex-col justify-center items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="address / ens"
        className="bg-white w-full  sm:w-3/5 outline-none px-5 py-4 font-semibold text-xl rounded-full text-center"
      />
      <button
        disabled={disabled}
        onClick={onClickFunction}
        className={`w-full sm:w-2/5 bg-primary ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        } mt-5 py-3 rounded-full text-2xl font-bold`}
        style={{ color: "white" }}
      >
        Search
      </button>
    </div>
  );
}
