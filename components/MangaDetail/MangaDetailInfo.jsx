import { Box, Text } from '@chakra-ui/react';

const MangaDetailInfo = ({ mangaDetail }) => {
  return (
    <Box mx={9} w={{ md: '40%' }} alignSelf='start' ml={{ sm: 14 }}>
      <Text as='h3' fontSize={32} textDecor='underline' textUnderlineOffset={3}>
        Description
      </Text>
      <Text fontSize={{ sm: 'md', md: 'xl' }} lineHeight={{ base: 7, md: 8 }}>
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
  );
};

export default MangaDetailInfo;
