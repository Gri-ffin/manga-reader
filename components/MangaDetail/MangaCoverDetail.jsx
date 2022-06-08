import { Text } from '@chakra-ui/react';

const MangaCoverDetail = ({ title, info }) => {
  return (
    <Text
      fontWeight='bold'
      textDecor='underline'
      textUnderlineOffset={3}
      textAlign='start'
      ml={{ base: 12, md: 0 }}
    >
      {title}:{' '}
      <Text
        as='span'
        fontWeight='medium'
        display='inline-block'
        textDecor='none'
      >
        {info}
      </Text>
    </Text>
  );
};

export default MangaCoverDetail;
