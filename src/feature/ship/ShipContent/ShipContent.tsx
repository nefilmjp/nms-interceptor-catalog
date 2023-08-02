import { Center, Link, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useMount } from 'react-use';

import { DatabaseContext } from '@/app/providers';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ShipInfo } from '@/feature/catalog/ShipInfo';
import { ShipData } from '@/types';

interface ShipContentProps {
  shipId: string;
}

export const ShipContent = (props: ShipContentProps) => {
  const { shipId } = props;
  const { coll } = useContext(DatabaseContext);

  const [data, setData] = useState<ShipData | null>();

  useMount(() => {
    if (!coll) {
      setData(null);
      return;
    }
    if (!shipId) {
      setData(null);
      return;
    }
    const shipData = coll.where((obj) => obj.uuid.startsWith(shipId));
    if (!shipData || shipData.length === 0) {
      setData(null);
      return;
    }
    setData(shipData[0]);
  });

  if (data === undefined) return <LoadingSpinner />;

  return (
    <>
      {data ? (
        <>
          <ShipInfo data={data} isSingle={true} />
          <Center mt='6'>
            <Link href='https://ko-fi.com/D1D7N4R45' isExternal={true}>
              <img
                alt='Buy Me a Coffee at ko-fi.com'
                height='36'
                src='https://storage.ko-fi.com/cdn/kofi1.png?v=3'
                width='143'
              />
            </Link>
          </Center>
        </>
      ) : (
        <Text>Not found</Text>
      )}
    </>
  );
};
