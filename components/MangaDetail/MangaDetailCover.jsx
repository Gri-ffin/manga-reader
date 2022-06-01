import { Box, Image, Link, Text } from '@chakra-ui/react';
import { MALSvg } from '../../utils/myanimelist';

const MangaDetailCover = ({ mangaDetail }) => {
  return (
    <Box
      marginLeft={{ md: 20 }}
      lineHeight={7}
      textAlign={{ base: 'center', md: 'start' }}
    >
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
      <Text
        fontWeight='bold'
        textDecor='underline'
        textUnderlineOffset={3}
        mb={2}
      >
        Content Rating:{' '}
        <Text as='span' fontWeight='medium'>
          {mangaDetail.contentRating}
        </Text>
      </Text>
      <Link href={mangaDetail.mal} isExternal>
        <MALSvg />
      </Link>
    </Box>
  );
};

export default MangaDetailCover;
