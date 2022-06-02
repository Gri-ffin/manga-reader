import { useEffect, useState } from 'react';
import { Box, Flex, Select } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ChapterPage = () => {
  const [pages, setPages] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const router = useRouter();
  let chapterId = router.query.chapterId;

  useEffect(() => {
    async function fetchPages() {
      const { data } = await axios.post('/api/fetch-pages', {
        chapterId: chapterId
      });
      setPages(data.pages);
      setChapters(data.chapters);
    }
    fetchPages();
  }, [chapterId]);

  function changeSelectHandler(e) {
    setSelectedOption(e.target.value);
    router.push(`/chapter/${e.target.value}`);
  }

  return (
    <>
      <Flex alignItems='center' justifyContent='center' flexDir='column'>
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
      <Flex alignItems='center' justifyContent='center' my={4}>
        <Select
          placeholder='Select a non external chapter'
          display='block'
          bg='gray.700'
          w={80}
          value={selectedOption}
          onChange={changeSelectHandler}
        >
          {chapters?.map((chapter, i) => (
            <option key={i} value={chapter.id}>
              {chapter.chapter}
            </option>
          ))}
        </Select>
      </Flex>
    </>
  );
};

export default ChapterPage;
