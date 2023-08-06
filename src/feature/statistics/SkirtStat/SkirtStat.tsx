/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box } from '@chakra-ui/react';
import { useContext, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { CommonContext } from '@/store/CommonContext';

import type { Interceptor } from '@/types';

export const SkirtStat = () => {
  const { coll, parts } = useContext(CommonContext);

  const propName = 'interceptor.skirtType' as keyof Interceptor;

  const values = useMemo(
    () => [
      ...Object.keys(parts.skirtType).map((key) =>
        coll!
          .chain()
          .find({ [propName]: { $eq: parseInt(key, 10) } })
          .count(),
      ),
      coll!
        .chain()
        .find({ [propName]: { $exists: false } })
        .count(),
    ],
    [coll, parts.skirtType],
  );

  const data = useMemo(
    () => ({
      labels: values[5]
        ? [...Object.values(parts.skirtType), '(Not set)']
        : Object.values(parts.skirtType),
      datasets: [
        {
          data: values,
        },
      ],
    }),
    [parts.skirtType, values],
  );

  return (
    <Box backgroundColor='white' borderRadius='8' pb='4'>
      <Doughnut
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Skirt Type',
            },
            datalabels: {
              formatter(value, context) {
                if (!value) return '';
                return `${context.chart.data.labels![context.dataIndex]}\n${
                  Math.round(((value * 10) / coll!.count()) * 100) / 10
                }%`;
              },
            },
          },
        }}
      />
    </Box>
  );
};
