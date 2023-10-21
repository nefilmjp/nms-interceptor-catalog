import { Box, Heading } from '@chakra-ui/react';
import { Select, MultiValue, OptionBase } from 'chakra-react-select';
import { useContext, useMemo } from 'react';

import { DATASETS, DATASET_LABEL } from '@/config';
import { CommonContext } from '@/store/CommonContext';

class Option implements OptionBase {
  constructor(
    public value: (typeof DATASETS)[number],
    public label: string,
    public colorScheme: string,
  ) {}
}

export const DatasetFinder = () => {
  const { settings, setSettings } = useContext(CommonContext);

  const Options: Option[] = useMemo(
    () =>
      DATASETS.map(
        (dataset) => new Option(dataset, DATASET_LABEL[dataset], ''),
      ),
    [],
  );

  return (
    <Box>
      <Heading fontSize='xl' mb='2'>
        Dataset
      </Heading>
      <Select
        isMulti={true}
        options={Options}
        onChange={(
          newValue: MultiValue<Option>,
          // actionMeta: ActionMeta<Option>,
        ) => {
          setSettings({
            ...settings,
            datasets: newValue.map((op) => op.value),
          });
        }}
        value={
          settings.datasets?.map(
            (dataset) => new Option(dataset, DATASET_LABEL[dataset], ''),
          ) || []
        }
      />
    </Box>
  );
};
