import { Box, Heading } from '@chakra-ui/react';
import { Select, MultiValue, OptionBase } from 'chakra-react-select';
import { useMemo } from 'react';

import { PARTS_DEFAULT } from '@/config/profiles/default';

import type { InterceptorQuery, BottomType } from '@/types';

interface BottomFinderProps {
  intQuery: InterceptorQuery;
  setIntQuery: (interceptor: InterceptorQuery) => void;
  parts: typeof PARTS_DEFAULT;
}

class Option implements OptionBase {
  constructor(
    public value: BottomType | -1,
    public label: string,
    public colorScheme: string,
  ) {}
}

export const BottomFinder = ({ ...props }: BottomFinderProps) => {
  const { intQuery, setIntQuery, parts } = props;

  const Options: Option[] = useMemo(
    () =>
      [
        ...Object.entries(parts.bottomType).map(
          ([value, label]) =>
            new Option(parseInt(value, 10) as unknown as BottomType, label, ''),
        ),
        new Option(-1, '(Not set)', ''),
      ].filter((op) => !intQuery.bottomType?.includes(op.value)),
    [intQuery.bottomType, parts.bottomType],
  );

  return (
    <Box>
      <Heading fontSize='xl' mb='2'>
        Bottom structure
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
            bottomType: newValue.map((op) => op.value),
          });
        }}
        value={
          intQuery.bottomType?.map(
            (value) =>
              new Option(
                value,
                value === -1 ? '(Not set)' : parts.bottomType[value],
                '',
              ),
          ) || []
        }
      />
    </Box>
  );
};
