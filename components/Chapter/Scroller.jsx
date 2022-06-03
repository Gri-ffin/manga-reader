import { Box } from '@chakra-ui/react';

const Scroller = ({ fn, image }) => {
  return (
    <Box
      display='block'
      onClick={fn}
      w='40px'
      h='40px'
      position='fixed'
      bottom='10px'
      right='20px'
      cursor='pointer'
      background={`url(/images/${image})`}
    ></Box>
  );
};

export default Scroller;
