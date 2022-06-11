import { Box, Flex, Text } from '@chakra-ui/react';
import { MALSvg } from '../../utils/myanimelist';
import Image from 'next/image';
import { AniList } from '../../utils/anilist';
import { MangaUpdate } from '../../utils/mangaupdate';
import MangaCoverDetail from './MangaCoverDetail';
import Track from './Track';

const MangaDetailCover = ({ mangaDetail }) => {
  const tags = JSON.parse(mangaDetail.tags);

  return (
    <Box lineHeight={7} textAlign={{ base: 'center', md: 'start' }}>
      <Image
        width={500}
        height={700}
        src={mangaDetail.coverImage || '/images/no-cover.jpeg'}
        alt={mangaDetail.title}
        placeholder='blur'
        blurDataURL={mangaDetail.coverImage || '/images/no-cover.jpeg'}
      />
      <MangaCoverDetail title='Status' info={mangaDetail.status} />
      <MangaCoverDetail
        title='Content Rating'
        info={mangaDetail.contentRating}
      />
      <MangaCoverDetail
        title='Tags'
        info={tags.map(tag => tag.localizedName.en).join(', ')}
      />
      <Text
        fontWeight='bold'
        fontSize='large'
        textDecor='underline'
        textUnderlineOffset={3}
        textAlign='start'
        ml={{ base: 12, md: 0 }}
      >
        Track
      </Text>
      <Flex justifyContent='space-around' mt={2}>
        <Track link={mangaDetail.mal}>
          <MALSvg />
        </Track>
        <Track link={mangaDetail.aniList}>
          <AniList />
        </Track>
        <Track link={mangaDetail.mangaUpdates}>
          <MangaUpdate />
        </Track>
      </Flex>
    </Box>
  );
};

export default MangaDetailCover;
