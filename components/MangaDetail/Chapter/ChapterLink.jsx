import { Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ExternalSiteSVG } from '../../../utils/ExternalSiteSVG';

const ChapterLink = ({ chapter }) => {
  return (
    <>
      {!chapter.isExternal ? (
        <NextLink href={`/chapter/${chapter.id}`}>
          <Link
            fontWeight='bold'
            display='block'
            my={2}
            textUnderlineOffset={3}
          >
            {chapter.chapter ? `Chapter ${chapter.chapter}` : ''}
            <Text as='span' fontWeight='medium'>
              {chapter.title ? `: ${chapter.title}` : ''}
            </Text>
          </Link>
        </NextLink>
      ) : (
        <Link
          fontWeight='bold'
          display='block'
          my={2}
          textUnderlineOffset={3}
          href={chapter.externalUrl}
          isExternal
        >
          <ExternalSiteSVG /> Chapter {chapter.chapter}
          <Text as='span' fontWeight='medium'></Text>
        </Link>
      )}
    </>
  );
};

export default ChapterLink;
