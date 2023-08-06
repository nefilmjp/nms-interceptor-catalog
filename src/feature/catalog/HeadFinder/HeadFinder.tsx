import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { omit } from 'lodash-es';

import { PARTS_DEFAULT } from '@/config/profiles/default';

import type { InterceptorQuery, Head } from '@/types';

interface HeadFinderProps {
  intQuery: InterceptorQuery;
  setIntQuery: (interceptor: InterceptorQuery) => void;
  parts: typeof PARTS_DEFAULT;
}

export const HeadFinder = ({ ...props }: HeadFinderProps) => {
  const { intQuery, setIntQuery, parts } = props;

  return (
    <Box>
      <HStack>
        <Heading fontSize='xl'>Head</Heading>
        <Button onClick={() => setIntQuery(omit(intQuery, 'head'))} size='xs'>
          Reset
        </Button>
      </HStack>
      <SimpleGrid columns={1} mt='2' spacing={2}>
        <CheckboxGroup
          value={intQuery.head?.map((val) => val.toString()) || []}
          onChange={(values) =>
            setIntQuery({
              ...intQuery,
              head: values.map((val) => parseInt(val.toString(), 10)) as Head[],
            })
          }
        >
          <Stack direction='row' flexWrap='wrap'>
            {/* <Heading fontSize='md'>Type</Heading> */}
            {Object.entries(parts.head).map(([value, label]) => (
              <Checkbox key={`head-finder-${value}`} value={value.toString()}>
                {label}
              </Checkbox>
            ))}
            <Checkbox value='-1'>(Not set)</Checkbox>
          </Stack>
        </CheckboxGroup>
      </SimpleGrid>
    </Box>
  );
};
