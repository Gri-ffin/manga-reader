import { Button, Flex, Text } from '@chakra-ui/react';
import Nextlink from 'next/link';

export default function Custom500() {
  return (
    <Flex
      h='100vh'
      alignItems='center'
      justifyContent='center'
      flexDir='column'
    >
      <Text fontSize={{ md: '8xl', base: '5xl' }} textTransform='uppercase'>
        oops!!!
      </Text>
      <Text color='red.500' fontSize={{ md: '3xl', base: 'xl' }}>
        An Error Occured
      </Text>
      <Text marginTop={6} fontSize={{ md: 'xl', base: 'md' }}>
        Return{' '}
        <Nextlink href='/'>
          <Button ml={3}>Home</Button>
        </Nextlink>
      </Text>
    </Flex>
  );
}
