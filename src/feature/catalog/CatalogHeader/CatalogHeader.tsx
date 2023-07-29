import { IconButton, Link, Text, Tooltip } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useContext } from 'react';
import { FaChartPie } from 'react-icons/fa';

import { DatabaseContext } from '@/app/providers';
import { CatalogContext } from '@/store/CatalogContext';

import { SearchDrawer } from '../SearchDrawer';
import { ThumbSizeButton } from '../ThumbSizeButton';

export const CatalogHeader = () => {
  const { coll } = useContext(DatabaseContext);
  const { items } = useContext(CatalogContext);

  return (
    <>
      <Text display={['none', 'block']} fontSize={['sm', 'sm', 'md']}>
        ({items.length}/{coll?.count()})
        {/* Displaying {items.length} of {coll?.count()} */}
      </Text>
      <SearchDrawer />
      <ThumbSizeButton />
      <Tooltip hasArrow label='Statistics'>
        <Link as={NextLink} href='/statistics'>
          <IconButton aria-label='Statistics' icon={<FaChartPie />} />
        </Link>
      </Tooltip>
    </>
  );
};
