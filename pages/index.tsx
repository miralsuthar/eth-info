import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Input from "../components/Input";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";

const Home: NextPage = () => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const buttonHandler = (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    router.push(`/${inputValue}`);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen font-poppins gap-20">
      <h1 className="font-semibold text-2xl sm:text-4xl text-primary">
        <span className="text-tertiary">Your</span> ethereum information
      </h1>
      {isLoading ? (
        <Loader type="TailSpin" height={50} color="#6F1143" />
      ) : (
        <Input
          input={inputValue}
          setInput={setInputValue}
          onClickFunction={buttonHandler}
          disabled={inputValue === ""}
        />
      )}
      <h1 className="text-center font-semibold text-tertiary">
        Build with ❤️ by{" "}
        <a href="https://github.com/miralsuthar">
          <span className="text-primary">miral</span>
        </a>
      </h1>
    </div>
  );
};

export default Home;
