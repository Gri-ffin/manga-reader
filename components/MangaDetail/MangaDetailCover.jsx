import { Box, Image, Link, Text } from '@chakra-ui/react';
import { MALSvg } from '../../utils/myanimelist';

const MangaDetailCover = ({ mangaDetail }) => {
  const tags = JSON.parse(mangaDetail.tags);
  console.log(tags);

  return (
    <Box lineHeight={7} textAlign={{ base: 'center', md: 'start' }}>
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
      <Text display={{ base: 'none', md: 'block' }} mb={2}>
        Tags: {tags.map(tag => tag.localizedName.en).join(', ')}
      </Text>
      <Link href={mangaDetail.mal} isExternal>
        <MALSvg />
      </Link>
    </Box>
  );
};

export default MangaDetailCover;
