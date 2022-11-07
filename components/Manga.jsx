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
          width={300}
          height={400}
          alt={manga.title}
          placeholder='blur'
          blurDataURL={manga.coverImage || '/images/no-cover.jpeg'}
          style={{ cursor: 'pointer' }}
          onClick={handleClick}
        />
        <Text fontSize={{ sm: 'sm', md: 'md' }}>
          {manga.title.length < 30
            ? manga.title
            : manga.title.substring(0, 30) + '...'}
        </Text>
      </Center>
    </Box>
  );
};

export default Manga;
