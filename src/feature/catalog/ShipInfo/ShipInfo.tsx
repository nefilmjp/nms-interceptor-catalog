import { SimpleGrid, Text, Box } from '@chakra-ui/react';

import { GALAXIES } from '@/config/galaxy';
import { PARTS_DEFAULT } from '@/config/profiles/default';

import { ShipInfoShare } from './ShipInfoShare';
import { ShipInfoTable } from './ShipInfoTable';
import { ShipInfoTabs } from './ShipInfoTabs';

import type { AppSettings } from '@/store/CommonContext';
import type { ShipData } from '@/types';

interface ShipInfoProps {
  data: ShipData | null;
  isSingle?: boolean;
  settings: AppSettings;
  setSettings: (settings: AppSettings) => void;
  parts: typeof PARTS_DEFAULT;
}

export const ShipInfo = ({ ...props }: ShipInfoProps) => {
  const { data, isSingle, settings, setSettings, parts } = props;

  if (!data) return null;

  return (
    <>
      {data.imageIds && <ShipInfoTabs imageIds={data.imageIds} />}
      <SimpleGrid columns={1}>
        {data.address !== undefined && (
          <Box ml='auto' mr='auto'>
            <Text fontSize='lg' fontWeight='bold'>
              {`${GALAXIES[data.galaxy]} (${data.galaxy + 1})`}
            </Text>
            <Text
              className='ff-glyphs'
              fontSize={['2xl', '3xl', '4xl']}
              textAlign='center'
              textShadow='0 0 3px currentColor, 0 0 1px currentColor'
            >
              {data.address.toString(16).toUpperCase()}
            </Text>
          </Box>
        )}
        <ShipInfoShare
          data={data}
          isSingle={isSingle}
          setSettings={setSettings}
          settings={settings}
        />
        <ShipInfoTable data={data} parts={parts} />
      </SimpleGrid>
    </>
  );
};
