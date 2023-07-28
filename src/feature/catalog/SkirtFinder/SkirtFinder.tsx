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

import { PARTS_SKIRT_TYPE } from '@/config/parts';

import type { InterceptorQuery, OptionBool, SkirtType } from '@/types';

interface SkirtFinderProps {
  intQuery: InterceptorQuery;
  setIntQuery: (interceptor: InterceptorQuery) => void;
}

export const SkirtFinder = ({ ...props }: SkirtFinderProps) => {
  const { intQuery, setIntQuery } = props;

  return (
    <Box>
      <HStack>
        <Heading fontSize='xl'>Skirt</Heading>
        <Button
          size='xs'
          onClick={() =>
            setIntQuery(omit(intQuery, 'skirtType', 'skirtColored'))
          }
        >
          Reset
        </Button>
      </HStack>
      <SimpleGrid columns={1} mt='2' spacing={2}>
        <CheckboxGroup
          value={intQuery.skirtType?.map((val) => val.toString()) || []}
          onChange={(values) =>
            setIntQuery({
              ...intQuery,
              skirtType: values.map((val) =>
                parseInt(val.toString(), 10),
              ) as SkirtType[],
            })
          }
        >
          <Stack direction='row' flexWrap='wrap'>
            {/* <Heading fontSize='md'>Type</Heading> */}
            {Object.entries(PARTS_SKIRT_TYPE).map(([value, label]) => (
              <Checkbox key={`body-finder-${value}`} value={value.toString()}>
                {label}
              </Checkbox>
            ))}
            <Checkbox value='-1'>(Not set)</Checkbox>
          </Stack>
        </CheckboxGroup>
        <CheckboxGroup
          value={intQuery.skirtColored?.map((val) => val.toString()) || []}
          onChange={(values) =>
            setIntQuery({
              ...intQuery,
              skirtColored: values.map((val) =>
                parseInt(val.toString(), 10),
              ) as OptionBool[],
            })
          }
        >
          <Stack direction='row' flexWrap='wrap'>
            <Heading fontSize='md'>Color</Heading>
            <Checkbox value='0'>Black</Checkbox>
            <Checkbox value='1'>Secondary color</Checkbox>
            <Checkbox value='-1'>(Not set)</Checkbox>
          </Stack>
        </CheckboxGroup>
      </SimpleGrid>
    </Box>
  );
};
