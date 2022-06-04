import { Box, Text } from '@chakra-ui/react';
import ChapterLink from './Chapter/ChapterLink';
import ReactMarkdown from 'react-markdown';
import style from './MangaDetailInfo.module.css';

const MangaDetailInfo = ({ mangaDetail }) => {
  return (
    <Box mx={9} w={{ md: '90%' }} alignSelf='start' ml={{ sm: 14 }}>
      <Text as='h3' fontSize={32} textDecor='underline' textUnderlineOffset={3}>
        Description
      </Text>
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) => (
            <a target='_blank' rel='noopener nofollow noreferrer' {...props} />
          )
        }}
        className={style.reactMarkDown}
      >
        {mangaDetail.description || 'No description provided.'}
      </ReactMarkdown>
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
          return <ChapterLink key={chapter.id} chapter={chapter} />;
        })}
      </Box>
    </Box>
  );
};

export default MangaDetailInfo;
