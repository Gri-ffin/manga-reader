import { Box, Center } from '@chakra-ui/react';
import axios from 'axios';
import MFA from 'mangadex-full-api';
import MangaDetailWrapper from '../../components/MangaDetail/MangaDetailWrapper';
import MangaDetailCover from '../../components/MangaDetail/MangaDetailCover';
import MangaDetailInfo from '../../components/MangaDetail/MangaDetailInfo';

const MangaDetail = ({ mangaDetail }) => {
  return (
    <Box my={5} overflowY='scroll' ml={{ xl: 40 }}>
      <Center as='h2' fontSize={{ sm: 32, md: 40 }} mb={5}>
        {mangaDetail.title}
      </Center>
      <MangaDetailWrapper>
        <MangaDetailCover mangaDetail={mangaDetail} />
        <MangaDetailInfo mangaDetail={mangaDetail} />
      </MangaDetailWrapper>
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
  const chapters = await result.getFeed(
    { translatedLanguage: ['en'], order: { chapter: 'asc' }, limit: Infinity },
    true
  );
  const transformedChapters = chapters.map(chapter => {
    return {
      id: chapter.id,
      volume: chapter.volume,
      chapter: chapter.chapter,
      title: chapter.title
      //TODO: add chapter pages with chapter.getReadablePages()
    };
  });
  // remove duplicates chapters from transformedChapters
  const uniqueChapters = transformedChapters.filter(
    (item, index) =>
      transformedChapters.findIndex(
        item2 => item2.chapter === item.chapter && item2.volume === item.volume
      ) === index
  );

  let returnValue = {
    id: result.id,
    title: result.title,
    coverImage: resultCover.imageSource,
    description: result.description,
    status: result.status,
    chapters: uniqueChapters,
    contentRating: result.contentRating
  };

  return {
    props: {
      mangaDetail: returnValue
    }
  };
}
