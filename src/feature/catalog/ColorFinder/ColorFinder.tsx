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
import { useMemo } from 'react';

import { PARTS_DEFAULT } from '@/config/profiles/default';

import type { InterceptorQuery, SkirtType } from '@/types';

interface ColorFinderProps {
  label: string;
  propName: 'primaryColor' | 'secondaryColor';
  intQuery: InterceptorQuery;
  setIntQuery: (interceptor: InterceptorQuery) => void;
  parts: typeof PARTS_DEFAULT;
}

export const ColorFinder = ({ ...props }: ColorFinderProps) => {
  const { label, propName, intQuery, setIntQuery, parts } = props;

  const colors = useMemo(
    () =>
      propName === 'primaryColor' ? parts.primaryColor : parts.secondaryColor,
    [propName, parts],
  );

  return (
    <Box>
      <HStack>
        <Heading fontSize='xl'>{label}</Heading>
        <Button onClick={() => setIntQuery(omit(intQuery, propName))} size='xs'>
          Reset
        </Button>
      </HStack>
      <SimpleGrid columns={1} mt='2' spacing={2}>
        <CheckboxGroup
          value={intQuery[propName]?.map((val) => val.toString()) || []}
          onChange={(values) =>
            setIntQuery({
              ...intQuery,
              [propName]: values.map((val) =>
                parseInt(val.toString(), 10),
              ) as SkirtType[],
            })
          }
        >
          <Stack direction='row' flexWrap='wrap'>
            {Object.entries(colors).map(([value, label]) => (
              <Checkbox key={`${propName}-${value}`} value={value.toString()}>
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
