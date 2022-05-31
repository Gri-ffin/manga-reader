import { Box, Center, Flex, Heading, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import MFA from 'mangadex-full-api';

const MangaDetail = ({ mangaDetail }) => {
  return (
    <Box my={5} overflowY='scroll'>
      <Center as='h2' fontSize={{ sm: 32, md: 40 }} mb={5}>
        {mangaDetail.title}
      </Center>
      <Flex
        justifyItems='center'
        alignItems={{ sm: 'center', md: 'normal' }}
        flexDir={{ sm: 'column', md: 'row' }}
        flex={1}
      >
        <Box marginLeft={{ md: 20 }} lineHeight={7}>
          <Image
            w={96}
            h='xl'
            src={mangaDetail.coverImage}
            alt={mangaDetail.title}
          />
          <Text fontWeight='bold' textDecor='underline' textUnderlineOffset={3}>
            Status:{' '}
            <Text as='span' fontWeight='medium'>
              {mangaDetail.status}
            </Text>
          </Text>
          <Text fontWeight='bold' textDecor='underline' textUnderlineOffset={3}>
            Content Rating:{' '}
            <Text as='span' fontWeight='medium'>
              {mangaDetail.contentRating}
            </Text>
          </Text>
        </Box>
        <Box mx={9} w={{ md: '40%' }} alignSelf='start' ml={{ sm: 14 }}>
          <Text
            as='h3'
            fontSize={32}
            textDecor='underline'
            textUnderlineOffset={3}
          >
            Description
          </Text>
          <Text
            fontSize={{ sm: 'md', md: 'xl' }}
            lineHeight={{ base: 7, md: 8 }}
          >
            {mangaDetail.description}
          </Text>
          <Text
            as='h3'
            fontSize={24}
            my={5}
            textDecor='underline'
            textUnderlineOffset={3}
          >
            Chapters
          </Text>
          <Box pt={1} pl={3} overflowY='scroll' h={96} w='full' bg='gray.700'>
            {mangaDetail.chapters.map(chapter => {
              return (
                <Text key={chapter.id} my={3} fontWeight='bold'>
                  Chapter {chapter.chapter || '?'}:{' '}
                  <Text as='span' fontWeight='medium'>
                    {chapter.title || '?'}
                  </Text>
                </Text>
              );
            })}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default MangaDetail;

export async function getStaticPaths() {
  const { data } = await axios.get('https://api.mangadex.org/manga', {
    params: {}
  });
  return {
    fallback: false,
    paths: data.data.map(manga => ({
      params: { mangaDetail: manga.id }
    }))
  };
}

export async function getStaticProps(context) {
  const mangaDetail = context.params.mangaDetail;
  await MFA.login('BaylordYama', 'redamohamed0');
  const result = await MFA.Manga.get(mangaDetail);
  const resultCover = await MFA.Cover.get(result.mainCover.id);
  const chapters = await result.getFeed({ translatedLanguage: ['en'] }, true);
  const transformedChapters = chapters.map(chapter => {
    return {
      id: chapter.id,
      volume: chapter.volume,
      chapter: chapter.chapter,
      title: chapter.title
    };
  });
  transformedChapters.sort((a, b) => {
    return +a.chapter - +b.chapter;
  });
  let returnValue = {
    id: result.id,
    title: result.title,
    coverImage: resultCover.imageSource,
    description: result.description,
    status: result.status,
    chapters: transformedChapters,
    contentRating: result.contentRating
  };

  return {
    props: {
      mangaDetail: returnValue
    }
  };
}
