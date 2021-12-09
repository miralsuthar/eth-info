import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Input from '../components/Input';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

const Home: NextPage = () => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const buttonHandler = (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    router.push(`/${inputValue}`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {isLoading ? (
        <Loader type="TailSpin" height={50} color="#6B7280" />
      ) : (
        <Input
          input={inputValue}
          setInput={setInputValue}
          onClickFunction={buttonHandler}
          disabled={inputValue === ''}
        />
      )}
    </div>
  );
};

export default Home;
