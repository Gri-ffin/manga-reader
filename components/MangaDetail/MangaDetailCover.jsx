import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { MALSvg } from '../../utils/myanimelist';
import Image from 'next/image';
import { AniList } from '../../utils/anilist';
import { MangaUpdate } from '../../utils/mangaupdate';

const MangaDetailCover = ({ mangaDetail }) => {
  const tags = JSON.parse(mangaDetail.tags);

  return (
    <Box lineHeight={7} textAlign={{ base: 'center', md: 'start' }}>
      <Image
        width={500}
        height={700}
        src={mangaDetail.coverImage}
        alt={mangaDetail.title}
        placeholder='blur'
        blurDataURL={mangaDetail.coverImage}
      />
      <Text
        fontWeight='bold'
        textDecor='underline'
        textUnderlineOffset={3}
        textAlign='start'
        ml={{ base: 12, md: 0 }}
      >
        Status:{' '}
        <Text as='span' fontWeight='medium'>
          {mangaDetail.status}
        </Text>
      </Text>
      <Text
        fontWeight='bold'
        textDecor='underline'
        textUnderlineOffset={3}
        textAlign='start'
        ml={{ base: 12, md: 0 }}
      >
        Content Rating:{' '}
        <Text as='span' fontWeight='medium'>
          {mangaDetail.contentRating}
        </Text>
      </Text>
      <Text display={{ base: 'none', md: 'block' }} lineHeight={7} w={96}>
        Tags: {tags.map(tag => tag.localizedName.en).join(', ')}
      </Text>
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
        {mangaDetail.mal && (
          <Link href={mangaDetail.mal} isExternal>
            <MALSvg />
          </Link>
        )}
        {mangaDetail.aniList && (
          <Link href={mangaDetail.aniList} isExternal>
            <AniList />
          </Link>
        )}
        {mangaDetail.mangaUpdates && (
          <Link href={mangaDetail.mangaUpdates} isExternal>
            <MangaUpdate />
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default MangaDetailCover;
