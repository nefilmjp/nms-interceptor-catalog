import { IconButton, Link, Tooltip } from '@chakra-ui/react';
import NextLink from 'next/link';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { FaChartPie } from 'react-icons/fa';

export const ShipHeader = () => {
  return (
    <>
      <Tooltip hasArrow label='Catalog'>
        <Link as={NextLink} href='/'>
          <IconButton aria-label='Catalog' icon={<BsGrid3X3GapFill />} />
        </Link>
      </Tooltip>
      <Tooltip hasArrow label='Statistics'>
        <Link as={NextLink} href='/statistics'>
          <IconButton aria-label='Statistics' icon={<FaChartPie />} />
        </Link>
      </Tooltip>
    </>
  );
};
