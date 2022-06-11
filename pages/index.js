import { useEffect, useState } from 'react';
import { Box, Center, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import Manga from '../components/Manga';
import Search from '../components/Search';
import Head from 'next/head';
import Spinner from '../components/Spinner';

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
    <>
      <Head>
        <title>Manga Reader</title>
      </Head>
      <Box>
        <Search />
        <Center fontSize={30}>Latest Uploads</Center>
        {mangas.length > 0 ? (
          <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
            {mangas?.map(manga => (
              <Manga key={manga.id} manga={manga} />
            ))}
          </SimpleGrid>
        ) : (
          <Spinner />
        )}
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get('https://api.mangadex.org/manga', {
    params: {}
  });
  return {
    props: {
      mangaIds: data.data.map(manga => manga.id)
    }
  };
}
