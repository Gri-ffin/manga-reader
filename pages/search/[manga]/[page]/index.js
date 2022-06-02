import { Box, Button, Center, Flex, SimpleGrid } from '@chakra-ui/react';
import MFA from 'mangadex-full-api';
import axios from 'axios';
import Manga from '../../../../components/Manga';
import { useRouter } from 'next/router';

export default function MangaSearch({ results, searchTerm, resultsLength }) {
  const router = useRouter();
  let page = router.query.page;

  function handlePreviousClick(e) {
    e.preventDefault();
    router.push(`/search/${searchTerm}/${parseInt(page) - 1}`);
  }

  function handleNextClick(e) {
    e.preventDefault();
    let newPath = `/search/${searchTerm}/${parseInt(page) + 1}`;
    router.push(newPath);
  }

  return (
    <Box>
      <Center as='h1' fontWeight='bold' fontSize={56}>
        {searchTerm}
      </Center>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
        {results?.map(manga => {
          return <Manga key={manga.id} manga={manga} />;
        })}
      </SimpleGrid>
      <Flex alignItems='center' justifyContent='center' mb={5}>
        {page > 1 && (
          <Button mx={5} onClick={handlePreviousClick}>
            Previous
          </Button>
        )}
        {page >= 1 && (page - 1) * 6 <= resultsLength && (
          <Button px={7} onClick={handleNextClick}>
            Next
          </Button>
        )}
      </Flex>
    </Box>
  );
}

export async function getStaticPaths() {
  const { data } = await axios.get('https://api.mangadex.org/manga', {
    params: {}
  });

  return {
    fallback: 'blocking',
    paths: data.data.map(manga => ({
      params: { manga: manga.attributes.title.en, page: '5' }
    }))
  };
}

export async function getStaticProps(context) {
  let mangatitle = context.params.manga;
  let page = context.params.page;
  await MFA.login('BaylordYama', 'redamohamed0');
  const allMangas = await MFA.Manga.search(mangatitle);
  const results = await MFA.Manga.search({
    title: mangatitle,
    limit: 6,
    offset: (page - 1) * 6
  });
  const transforedResults = await transformArray(results);
  return {
    props: {
      results: transforedResults,
      searchTerm: mangatitle,
      resultsLength: allMangas.length
    }
  };
}

function transformArray(array) {
  const newResult = array.map(async manga => {
    let coverImage = await MFA.Cover.get(manga.mainCover.id);
    return {
      id: manga.id,
      title: manga.title,
      coverImage: coverImage.imageSource,
      description: manga.description
    };
  });
  return Promise.all(newResult);
}
