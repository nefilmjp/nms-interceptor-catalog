import {
  SimpleGrid,
  Text,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
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

import { SHIP_AVAILABILITY } from '@/config';
import { GALAXIES } from '@/config/galaxy';
import {
  PARTS_BODY_TYPE,
  PARTS_BOTTOM_TYPE,
  PARTS_HEAD,
  PARTS_OPTION_WING,
  PARTS_PRIMARY_COLOR,
  PARTS_SECONDARY_COLOR,
  PARTS_SKIRT_PAINTED,
  PARTS_SKIRT_TYPE,
  PARTS_TOP_TYPE,
} from '@/config/parts';
import { getShortId } from '@/utils/getShortId';

import type { ShipData } from '@/types';

interface ShipEditorProps {
  data: ShipData | null;
  isSingle?: boolean;
}

export const ShipInfo = ({ ...props }: ShipEditorProps) => {
  const { data, isSingle } = props;

  if (!data) return null;

  const { interceptor } = data;

  return (
    <SimpleGrid columns={1} spacing={4}>
      {data.imageIds && (
        <Tabs>
          <TabList>
            {data.imageIds.map((_, idx) => (
              <Tab key={`ship-info-tablist-${idx}`}>
                {idx === 0 ? 'Front' : idx === 1 ? 'Rear' : `Add.${idx - 1}`}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {data.imageIds.map((id, idx) => (
              <TabPanel
                key={`ship-info-tabpanel-${idx}`}
                p='0'
                position='relative'
              >
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
                <Text fontSize='sm' mt='2' textAlign='right'>
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
      )}
      {data.address !== undefined && (
        <Box ml='auto' mr='auto' mt='-2'>
          <Text className='ff-geo' fontSize='lg' fontWeight='bold'>
            {`${GALAXIES[data.galaxy]} (${data.galaxy + 1})`}
          </Text>
          <Text
            className='ff-glyphs'
            fontSize={['2xl', '3xl', '4xl']}
            mt='-0.2em'
            textAlign='center'
          >
            {data.address.toString(16).toUpperCase()}
          </Text>
        </Box>
      )}
      <TableContainer marginInline='auto'>
        <Table size='sm'>
          <Tbody>
            <Tr>
              <Th>Primary Color</Th>
              <Td>
                {interceptor.primaryColor !== undefined
                  ? PARTS_PRIMARY_COLOR[interceptor.primaryColor]
                  : '-'}
              </Td>
            </Tr>
            <Tr>
              <Th>Secondary Color</Th>
              <Td>
                {interceptor.secondaryColor !== undefined
                  ? PARTS_SECONDARY_COLOR[interceptor.secondaryColor]
                  : '-'}
              </Td>
            </Tr>
            <Tr>
              <Th>Head</Th>
              <Td>
                {interceptor.head !== undefined
                  ? PARTS_HEAD[interceptor.head]
                  : '-'}
              </Td>
            </Tr>
            <Tr>
              <Th>Body</Th>
              <Td>
                {interceptor.bodyType !== undefined
                  ? PARTS_BODY_TYPE[interceptor.bodyType]
                  : '-'}
              </Td>
            </Tr>
            <Tr>
              <Th>Rear Wing</Th>
              <Td>
                {interceptor.bodyWing !== undefined
                  ? PARTS_OPTION_WING[interceptor.bodyWing]
                  : '-'}
              </Td>
            </Tr>
            <Tr>
              <Th>Top Structure</Th>
              <Td>
                {interceptor.topType !== undefined
                  ? PARTS_TOP_TYPE[interceptor.topType]
                  : '-'}
              </Td>
            </Tr>
            <Tr>
              <Th>Bottom Structure</Th>
              <Td>
                {interceptor.bottomType !== undefined
                  ? PARTS_BOTTOM_TYPE[interceptor.bottomType]
                  : '-'}
              </Td>
            </Tr>
            <Tr>
              <Th>Skirt</Th>
              <Td>
                {interceptor.skirtType !== undefined
                  ? PARTS_SKIRT_TYPE[interceptor.skirtType]
                  : '-'}
                {interceptor.skirtColored !== undefined
                  ? ` (${PARTS_SKIRT_PAINTED[interceptor.skirtColored]})`
                  : ''}
              </Td>
            </Tr>
            {data.availability === 1 && data.galaxy !== undefined && (
              <Tr>
                <Th>Galaxy</Th>
                <Td>{`${GALAXIES[data.galaxy]} (${data.galaxy + 1})`}</Td>
              </Tr>
            )}
            {data.availability === 1 && data.address !== undefined && (
              <Tr>
                <Th>Portal Address</Th>
                <Td>
                  {data.address.toString(16).toUpperCase()}
                  <Button
                    ml='2'
                    size='xs'
                    onClick={() =>
                      navigator.clipboard.writeText(
                        data.address!.toString(16).toUpperCase(),
                      )
                    }
                  >
                    Copy
                  </Button>
                </Td>
              </Tr>
            )}
            <Tr>
              <Th>ID</Th>
              <Td>
                <Text>{getShortId(data.uuid)}</Text>
                {!isSingle && (
                  <Text mt='1'>
                    <Link
                      color='blue.400'
                      isExternal={true}
                      href={`${location.protocol}//${
                        location.host
                      }/ship/?id=${getShortId(data.uuid)}`}
                    >
                      Single page
                      <Icon
                        as={FaExternalLinkAlt}
                        h='0.8em'
                        ml='0.2em'
                        mr='0.2em'
                        verticalAlign='baseline'
                        w='0.8em'
                      />
                    </Link>
                    <Button
                      ml='2'
                      size='xs'
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${location.protocol}//${
                            location.host
                          }/ship/?id=${getShortId(data.uuid)}`,
                        )
                      }
                    >
                      Copy
                    </Button>
                  </Text>
                )}
              </Td>
            </Tr>
            <Tr>
              <Th>Availability</Th>
              <Td>
                {data.availability !== undefined
                  ? SHIP_AVAILABILITY[data.availability]
                  : '-'}
              </Td>
            </Tr>
            {data.comment !== undefined && (
              <Tr>
                <Th>Comment</Th>
                <Td>{data.comment}</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </SimpleGrid>
  );
};
