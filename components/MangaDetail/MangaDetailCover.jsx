import { Box, Link, Text } from '@chakra-ui/react';
import { MALSvg } from '../../utils/myanimelist';
import Image from 'next/image';

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
      <Text display={{ base: 'none', md: 'block' }} mb={2} w={96}>
        Tags: {tags.map(tag => tag.localizedName.en).join(', ')}
      </Text>
      {mangaDetail.mal.length > 1 && (
        <Link href={mangaDetail.mal} isExternal>
          <MALSvg />
        </Link>
      )}
    </Box>
  );
};

export default MangaDetailCover;
