import React, { ReactComponentElement } from 'react';

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
    <div className="w-3/6 font-montserrat">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Address/ENS"
        className="bg-gray-500 shadow-inputShadow w-full outline-none px-5 py-4 font-semibold text-xl rounded-md text-center"
      />
      <button
        disabled={disabled}
        onClick={onClickFunction}
        className={`w-full ${
          disabled ? 'bg-gray-800 cursor-not-allowed' : 'bg-white'
        } mt-5 py-4 rounded-md text-xl font-bold`}
      >
        Search
      </button>
    </div>
  );
}
