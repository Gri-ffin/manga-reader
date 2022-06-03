import { useEffect, useState, useRef } from 'react';
import { Flex, Select } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Scroller from '../../../components/Chapter/Scroller';

const ChapterPage = () => {
  const [pages, setPages] = useState([]);
  const [chapters, setChapters] = useState([]);
  const router = useRouter();
  const topPageRef = useRef(null);
  const bottomPageRef = useRef(null);
  let chapterId = router.query.chapterId;

  useEffect(() => {
    async function fetchPages() {
      const { data } = await axios.post('/api/fetch/fetch-pages', {
        chapterId: chapterId
      });
      setPages(data.pages);
      setChapters(data.chapters);
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
          />
        ))}
      </Flex>
      <Flex
        alignItems='center'
        justifyContent='center'
        my={4}
        ref={bottomPageRef}
      >
        <Scroller image='top.png' fn={scrollToTop} />
        <Select
          display='block'
          value={chapterId}
          bg='gray.700'
          w={80}
          onChange={changeSelectHandler}
        >
          {chapters?.map(chapter => {
            return (
              <option
                key={chapter.id}
                value={chapter.id}
                selected={chapterId == chapter.id}
              >
                Chapter {chapter.chapter || 'Oneshot'}
              </option>
            );
          })}
        </Select>
      </Flex>
    </>
  );
};

export default ChapterPage;
