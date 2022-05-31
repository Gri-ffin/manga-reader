import { Box, Center, Image, Text } from '@chakra-ui/react';

const Manga = ({ manga }) => {
  return (
    <Box>
      <Center flexDir='column'>
        <Image
          src={manga.coverImage}
          w='50%'
          height='10%'
          alt={manga.title}
          cursor='pointer'
        />
        <Text noOfLines={1} fontSize={{ sm: 'sm', md: 'md' }}>
          {manga.title}
        </Text>
      </Center>
    </Box>
  );
};

export default Manga;
