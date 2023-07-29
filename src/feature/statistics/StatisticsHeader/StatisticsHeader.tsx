import { IconButton, Link, Tooltip } from '@chakra-ui/react';
import NextLink from 'next/link';
import { BsGrid3X3GapFill } from 'react-icons/bs';

export const StatisticsHeader = () => {
  return (
    <>
      <Tooltip hasArrow label='Catalog'>
        <Link as={NextLink} href='/'>
          <IconButton aria-label='Catalog' icon={<BsGrid3X3GapFill />} />
        </Link>
      </Tooltip>
    </>
  );
};
