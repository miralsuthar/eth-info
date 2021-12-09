import '../styles/globals.css';
import Error from 'next/error';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    );
  }
  return <Component {...pageProps} />;
}

export default MyApp;
