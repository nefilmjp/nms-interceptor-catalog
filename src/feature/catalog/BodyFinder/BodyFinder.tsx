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

import { PARTS_OPTION_WING } from '@/config/profiles/common';
import { PARTS_DEFAULT } from '@/config/profiles/default';

import type { InterceptorQuery, BodyType, Option3 } from '@/types';

interface BodyFinderProps {
  intQuery: InterceptorQuery;
  setIntQuery: (interceptor: InterceptorQuery) => void;
  parts: typeof PARTS_DEFAULT;
}

export const BodyFinder = ({ ...props }: BodyFinderProps) => {
  const { intQuery, setIntQuery, parts } = props;

  return (
    <Box>
      <HStack>
        <Heading fontSize='xl'>Body</Heading>
        <Button
          onClick={() => setIntQuery(omit(intQuery, 'bodyType', 'bodyWing'))}
          size='xs'
        >
          Reset
        </Button>
      </HStack>
      <SimpleGrid columns={1} mt='2' spacing={2}>
        <CheckboxGroup
          value={intQuery.bodyType?.map((val) => val.toString()) || []}
          onChange={(values) =>
            setIntQuery({
              ...intQuery,
              bodyType: values.map((val) =>
                parseInt(val.toString(), 10),
              ) as BodyType[],
            })
          }
        >
          <Stack direction='row' flexWrap='wrap'>
            {/* <Heading fontSize='md'>Type</Heading> */}
            {Object.entries(parts.bodyType).map(([value, label]) => (
              <Checkbox key={`body-finder-${value}`} value={value.toString()}>
                {label}
              </Checkbox>
            ))}
            <Checkbox value='-1'>(Not set)</Checkbox>
          </Stack>
        </CheckboxGroup>
        <CheckboxGroup
          value={intQuery.bodyWing?.map((val) => val.toString()) || []}
          onChange={(values) =>
            setIntQuery({
              ...intQuery,
              bodyWing: values.map((val) =>
                parseInt(val.toString(), 10),
              ) as Option3[],
            })
          }
        >
          <Stack direction='row' flexWrap='wrap'>
            <Heading fontSize='md'>{parts.wingLabel}</Heading>
            {Object.entries(PARTS_OPTION_WING).map(([value, label]) => (
              <Checkbox
                key={`body-wing-finder-${value}`}
                value={value.toString()}
              >
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
