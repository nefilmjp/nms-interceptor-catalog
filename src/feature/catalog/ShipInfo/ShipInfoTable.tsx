import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import { useUpdateEffect } from 'react-use';

import { SHIP_AVAILABILITY } from '@/config';
import { GALAXIES } from '@/config/galaxy';
import {
  PARTS_OPTION_WING,
  PARTS_SKIRT_PAINTED,
} from '@/config/profiles/common';
import { PARTS_DEFAULT } from '@/config/profiles/default';
import { getShortId } from '@/utils/getShortId';

import type { ShipData } from '@/types';

interface ShipInfoTableProps {
  data: ShipData;
  parts: typeof PARTS_DEFAULT;
}

export const ShipInfoTable = ({ ...props }: ShipInfoTableProps) => {
  const { data, parts } = props;
  const { interceptor } = data;

  const { onCopy, value, setValue, hasCopied } = useClipboard('');

  const toast = useToast();

  useUpdateEffect(() => {
    if (!value) return;
    onCopy();
  }, [value]);

  useUpdateEffect(() => {
    if (!hasCopied) return;
    toast({
      title: 'Copied',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  }, [hasCopied]);

  return (
    <TableContainer marginInline='auto' mt='4'>
      <Table size='sm'>
        <Tbody>
          <Tr>
            <Th>Primary Color</Th>
            <Td>
              {interceptor.primaryColor !== undefined
                ? parts.primaryColor[interceptor.primaryColor]
                : '-'}
            </Td>
          </Tr>
          <Tr>
            <Th>Secondary Color</Th>
            <Td>
              {interceptor.secondaryColor !== undefined
                ? parts.secondaryColor[interceptor.secondaryColor]
                : '-'}
            </Td>
          </Tr>
          <Tr>
            <Th>Head</Th>
            <Td>
              {interceptor.head !== undefined
                ? parts.head[interceptor.head]
                : '-'}
            </Td>
          </Tr>
          <Tr>
            <Th>Body</Th>
            <Td>
              {interceptor.bodyType !== undefined
                ? parts.bodyType[interceptor.bodyType]
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
                ? parts.topType[interceptor.topType]
                : '-'}
            </Td>
          </Tr>
          <Tr>
            <Th>Bottom Structure</Th>
            <Td>
              {interceptor.bottomType !== undefined
                ? parts.bottomType[interceptor.bottomType]
                : '-'}
            </Td>
          </Tr>
          <Tr>
            <Th>Skirt</Th>
            <Td>
              {interceptor.skirtType !== undefined
                ? parts.skirtType[interceptor.skirtType]
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
                  onClick={() => {
                    setValue(data.address!.toString(16).toUpperCase());
                  }}
                >
                  Copy
                </Button>
              </Td>
            </Tr>
          )}
          <Tr>
            <Th>Ship ID</Th>
            <Td>
              {getShortId(data.uuid)}
              <Button
                ml='2'
                size='xs'
                onClick={() => {
                  setValue(getShortId(data.uuid));
                }}
              >
                Copy
              </Button>
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
  );
};
