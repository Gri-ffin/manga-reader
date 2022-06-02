import { useEffect, useState, useRef } from 'react';
import { Box, Button, Center, Flex, Input, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import Manga from '../components/Manga';
import { useRouter } from 'next/router';

export default function Home({ mangaIds }) {
  const [mangas, setMangas] = useState([]);
  const inputRef = useRef();
  const router = useRouter();

  useEffect(() => {
    async function fetchMangas() {
      const { data } = await axios.post('/api/fetch/fetch-mangas', {
        mangaIds
      });
      setMangas(data.transformedResult);
    }
    fetchMangas();
  }, [mangaIds]);

  async function handleSearch(e) {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    router.push(`/search/${inputValue}/1`);
  }

  async function handleRandom(e) {
    e.preventDefault();
    const { data } = await axios.get('/api/search/random-manga');
    router.push(`/${data.mangaId}`);
  }

  return (
    <Box>
      <Flex
        justifyContent='center'
        mt={10}
        alignItems='center'
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Input
          placeholder='Search a manga'
          w='70%'
          bg='gray.700'
          ref={inputRef}
        />
        <Box>
          <Button ml={3} mt={{ base: 3, md: 0 }} onClick={handleSearch}>
            Submit
          </Button>
          <Button ml={3} mt={{ base: 3, md: 0 }} onClick={handleRandom}>
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
