import { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, Input, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import Manga from '../components/Manga';

export default function Home({ mangaIds }) {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    async function fetchMangas() {
      const { data } = await axios.post('/api/fetch-mangas', { mangaIds });
      setMangas(data.transformedResult);
    }
    fetchMangas();
  }, [mangaIds]);

  return (
    <Box>
      <Flex
        justifyContent='center'
        mt={10}
        alignItems='center'
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Input placeholder='Search a manga' w='70%' bg='gray.700' />
        <Box>
          <Button ml={3} mt={{ base: 3, md: 0 }}>
            Submit
          </Button>
          <Button ml={3} mt={{ base: 3, md: 0 }}>
            Random
          </Button>
        </Box>
      </Flex>
      <Center fontSize={30}>Latest Uploads</Center>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
        {mangas?.map(manga => {
          return <Manga key={manga.id} manga={manga} />;
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
