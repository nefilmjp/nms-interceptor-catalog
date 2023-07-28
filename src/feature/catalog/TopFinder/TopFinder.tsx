import { Box, Heading } from '@chakra-ui/react';
import { Select, MultiValue, OptionBase } from 'chakra-react-select';
import { useMemo } from 'react';

import { PARTS_TOP_TYPE } from '@/config/parts';

import type { InterceptorQuery, TopType } from '@/types';

interface TopFinderProps {
  intQuery: InterceptorQuery;
  setIntQuery: (interceptor: InterceptorQuery) => void;
}

class Option implements OptionBase {
  constructor(
    public value: TopType | -1,
    public label: string,
    public colorScheme: string,
  ) {}
}

export const TopFinder = ({ ...props }: TopFinderProps) => {
  const { intQuery, setIntQuery } = props;

  const Options: Option[] = useMemo(
    () =>
      [
        ...Object.entries(PARTS_TOP_TYPE).map(
          ([value, label]) =>
            new Option(parseInt(value, 10) as unknown as TopType, label, ''),
        ),
        new Option(-1, 'Not set', ''),
      ].filter((op) => !intQuery.topType?.includes(op.value)),
    [intQuery.topType],
  );

  return (
    <Box>
      <Heading fontSize='xl' mb='2'>
        Top structure
      </Heading>
      <Select
        isMulti={true}
        options={Options}
        onChange={(
          newValue: MultiValue<Option>,
          // actionMeta: ActionMeta<Option>,
        ) => {
          setIntQuery({
            ...intQuery,
            topType: newValue.map((op) => op.value),
          });
        }}
        value={
          intQuery.topType?.map(
            (value) =>
              new Option(
                value,
                value === -1 ? 'Not set' : PARTS_TOP_TYPE[value],
                '',
              ),
          ) || []
        }
      />
    </Box>
  );
};
