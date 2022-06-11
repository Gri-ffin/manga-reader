import { Flex, Spinner } from '@chakra-ui/react';

const CustomSpinner = () => (
  <Flex h='100vh' justifyContent='center' alignItems='center'>
    <Spinner
      size='xl'
      thickness='4px'
      speed='.70s'
      emptyColor='gray.200'
      color='blue.500'
    />
  </Flex>
);

export default CustomSpinner;
