import { useEffect, useState } from 'react';
import { Box, Center, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import axios from 'axios';

export default function Home({ mangaIds }) {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    async function fetchMangas() {
      const { data } = await axios.post('/api/fetch-mangas', { mangaIds });
      setMangas(data.transformedResult);
    }
    fetchMangas();
  }, [mangaIds]);

  console.log(mangas);

  return (
    <Box>
      <Center fontSize={30}>Latest Uploads</Center>
      <SimpleGrid columns={2} spacing={10}>
        {mangas?.map(manga => {
          return (
            <Box key={manga.id}>
              <Center flexDir='column'>
                <Image src={manga.coverImage} w='50%' alt={manga.title} />
                <Text>{manga.title}</Text>
              </Center>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get('https://api.mangadex.org/manga', {
    params: {}
  });
  return {
    props: {
      mangaIds: data.data.map(manga => manga.id)
    }
  };
}
