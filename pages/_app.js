import { ChakraProvider } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NextNProgress />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
