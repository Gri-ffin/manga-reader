import { Link } from '@chakra-ui/react';

const Track = ({ link, children }) => (
  <>
    {link && (
      <Link href={link} isExternal>
        {children}
      </Link>
    )}
  </>
);

export default Track;
