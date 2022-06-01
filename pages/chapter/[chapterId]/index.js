import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ChapterPage = () => {
  const [pages, setPages] = useState([]);
  const router = useRouter();
  let chapterId = router.query.chapterId;

  useEffect(() => {
    async function fetchPages() {
      const { data } = await axios.post('/api/fetch-pages', {
        chapterId: chapterId
      });
      setPages(data.pages);
    }
    fetchPages();
  }, [chapterId]);

  return (
    <Flex alignItems='center' justifyContent='center' flexDir='column'>
      {pages?.map((page, i) => (
        <Image
          src={page}
          height={500}
          width={700}
          key={i}
          alt={`page ${i + 1}`}
        />
      ))}
    </Flex>
  );
};

export default ChapterPage;
