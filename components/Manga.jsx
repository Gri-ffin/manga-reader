import { Box, Center, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Manga = ({ manga }) => {
  const router = useRouter();

  const handleClick = e => {
    e.preventDefault();
    router.push('/' + manga.id);
  };

  return (
    <Box>
      <Center flexDir='column'>
        <Image
          src={manga.coverImage}
          w='50%'
          height='10%'
          alt={manga.title}
          cursor='pointer'
          onClick={handleClick}
        />
        <Text noOfLines={1} fontSize={{ sm: 'sm', md: 'md' }}>
          {manga.title}
        </Text>
      </Center>
    </Box>
  );
};

export default Manga;
