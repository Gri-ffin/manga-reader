import { Box, Center, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
          src={manga.coverImage || '/images/no-cover.jpeg'}
          width={400}
          height={500}
          alt={manga.title}
          placeholder='blur'
          blurDataURL={manga.coverImage || '/images/no-cover.jpeg'}
          style={{ cursor: 'pointer' }}
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
