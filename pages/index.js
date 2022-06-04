import { useEffect, useState, useRef } from 'react';
import { Box, Button, Center, Flex, Input, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import Manga from '../components/Manga';
import { useRouter } from 'next/router';
import Search from '../components/Search';

export default function Home({ mangaIds }) {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    async function fetchMangas() {
      const { data } = await axios.post('/api/fetch/fetch-mangas', {
        mangaIds
      });
      setMangas(data.transformedResult);
    }
    fetchMangas();
  }, [mangaIds]);

  return (
    <Box>
      <Search />
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
