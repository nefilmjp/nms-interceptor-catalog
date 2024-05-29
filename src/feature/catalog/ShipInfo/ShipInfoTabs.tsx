import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
  Icon,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface ShipInfoTabsProps {
  imageIds: string[];
}

export const ShipInfoTabs = ({ ...props }: ShipInfoTabsProps) => {
  const { imageIds } = props;

  return (
    <Tabs>
      <TabList>
        {imageIds.map((_, idx) => (
          <Tab key={`ship-info-tablist-${idx}`}>
            {idx === 0 ? 'Front' : idx === 1 ? 'Rear' : `Add.${idx - 1}`}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {imageIds.map((id, idx) => (
          <TabPanel key={`ship-info-tabpanel-${idx}`} p='0' position='relative'>
            <Box
              alignItems='center'
              aria-hidden='true'
              bottom='0'
              display='flex'
              justifyContent='center'
              left='0'
              pos='absolute'
              right='0'
              top='0'
            >
              <Spinner />
            </Box>
            <img
              alt={`#${id}`}
              height='576'
              key={`image-${id}-${idx}`}
              src={`https://i.imgur.com/${id}h.webp`}
              style={{ position: 'relative' }}
              width='1024'
            />
            <Text fontSize='sm' mt='2' position='relative' textAlign='right'>
              Show in{' '}
              <Link
                color='blue.400'
                href={`https://imgur.com/${id}`}
                isExternal={true}
              >
                Imgur
                <Icon
                  as={FaExternalLinkAlt}
                  h='0.8em'
                  ml='0.2em'
                  mr='0.2em'
                  verticalAlign='baseline'
                  w='0.8em'
                />
              </Link>
            </Text>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
