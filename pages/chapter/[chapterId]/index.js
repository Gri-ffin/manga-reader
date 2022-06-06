import { useEffect, useState, useRef } from 'react';
import { Flex, Link, Select, Spinner } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Scroller from '../../../components/Chapter/Scroller';
import NextLink from 'next/link';

const ChapterPage = () => {
  const [pages, setPages] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const topPageRef = useRef(null);
  const bottomPageRef = useRef(null);
  let chapterId = router.query.chapterId;

  let thisChapterIndex =
    chapters?.length && chapters.findIndex(chapter => chapter.id === chapterId);
  let nextChapter = chapters && chapters[thisChapterIndex + 1];
  let prevChapter = chapters && chapters[thisChapterIndex - 1];
  useEffect(() => {
    async function fetchPages() {
      setLoading(true);
      const { data } = await axios.post('/api/fetch/fetch-pages', {
        chapterId: chapterId
      });
      setPages(data.pages);
      setChapters(data.chapters);
      setLoading(false);
    }
    fetchPages();
  }, [chapterId]);

  function scrollToTop() {
    topPageRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  function changeSelectHandler(e) {
    router.push(`/chapter/${e.target.value}`);
  }

  return (
    <>
      {loading && pages.length ? (
        <Flex h='100vh' justifyContent='center' alignItems='center'>
          <Spinner size='xl' />
        </Flex>
      ) : (
        <Flex
          alignItems='center'
          justifyContent='center'
          flexDir='column'
          ref={topPageRef}
        >
          {pages?.map((page, i) => (
            <Image
              src={page}
              height={700}
              width={700}
              key={i}
              alt={`page ${i + 1}`}
              title={`page ${i + 1}`}
            />
          ))}
        </Flex>
      )}
      <Flex
        alignItems='center'
        justifyContent='space-evenly'
        my={4}
        ref={bottomPageRef}
      >
        <Scroller image='top.png' fn={scrollToTop} />
        {prevChapter && (
          <NextLink href={`/chapter/${prevChapter.id}`}>
            <Link
              bg='gray.700'
              px={5}
              rounded='md'
              py={3}
              _hover={{ textDecor: 'none', bg: 'gray.500' }}
            >
              Previous
            </Link>
          </NextLink>
        )}
        <Select
          display='block'
          value={chapterId}
          placeholder='Select Chapter'
          bg='gray.700'
          w={80}
          onChange={changeSelectHandler}
        >
          {chapters?.map(chapter => {
            return (
              <option key={chapter.id} value={chapter.id}>
                Chapter {chapter.chapter || 'Oneshot'}
              </option>
            );
          })}
        </Select>
        {nextChapter && (
          <NextLink href={`/chapter/${nextChapter.id}`}>
            <Link
              bg='gray.700'
              _hover={{ textDecor: 'none', bg: 'gray.500' }}
              rounded='md'
              py={3}
              px={5}
            >
              Next
            </Link>
          </NextLink>
        )}
      </Flex>
    </>
  );
};

export default ChapterPage;
