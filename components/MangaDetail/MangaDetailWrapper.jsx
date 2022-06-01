import { Flex } from '@chakra-ui/react';

const MealDetailWrapper = ({ children }) => {
  return (
    <Flex
      justifyItems='center'
      alignItems={{ sm: 'center', md: 'normal' }}
      flexDir={{ base: 'column', md: 'row' }}
    >
      {children}
    </Flex>
  );
};

export default MealDetailWrapper;
