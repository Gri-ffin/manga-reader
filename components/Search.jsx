import { useRef } from 'react';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Search = () => {
  const router = useRouter();
  const inputRef = useRef();

  async function handleSearch(e) {
    e.preventDefault();
    if (inputRef.current.value.trim().length <= 0) {
      return;
    }
    const inputValue = inputRef.current.value;
    let trimedInputValue = inputValue.trim();
    router.push(`/search/${trimedInputValue}/1`);
  }

  async function handleRandom(e) {
    e.preventDefault();
    const { data } = await axios.get('/api/search/random-manga');
    router.push(`/${data.mangaId}`);
  }

  return (
    <form>
      <Flex
        justifyContent='center'
        mt={10}
        alignItems='center'
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Input
          placeholder='Search a manga'
          w='70%'
          bg='gray.700'
          ref={inputRef}
        />
        <Box>
          <Button
            ml={3}
            mt={{ base: 3, md: 0 }}
            onClick={handleSearch}
            type='submit'
          >
            Submit
          </Button>
          <Button ml={3} mt={{ base: 3, md: 0 }} onClick={handleRandom}>
            Random
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default Search;
