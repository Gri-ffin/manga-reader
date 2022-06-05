import { Center, ChakraProvider } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  let year = new Date().getFullYear();
  return (
    <ChakraProvider>
      <NextNProgress />
      <Component {...pageProps} />
      <Center as='footer' mt={6} mb={2}>
        Powered by Mangadex - Yassine Tadlaoui &copy; {year}
      </Center>
    </ChakraProvider>
  );
}

export default MyApp;
