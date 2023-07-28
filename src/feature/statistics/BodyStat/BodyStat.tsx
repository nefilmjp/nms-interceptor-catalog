/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box } from '@chakra-ui/react';
import { useContext, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { DatabaseContext } from '@/app/providers';
import { PARTS_BODY_TYPE } from '@/config/parts';

import type { Interceptor } from '@/types';

export const BodyStat = () => {
  const { coll } = useContext(DatabaseContext);

  const propName = 'interceptor.bodyType' as keyof Interceptor;

  const values = useMemo(
    () => [
      ...Object.keys(PARTS_BODY_TYPE).map((key) =>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const data = useMemo(
    () => ({
      labels: values[5]
        ? [...Object.values(PARTS_BODY_TYPE), '(Not set)']
        : Object.values(PARTS_BODY_TYPE),
      datasets: [
        {
          data: values,
        },
      ],
    }),
    [values],
  );

  return (
    <Box backgroundColor='white' borderRadius='8' pb='4'>
      <Doughnut
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Body Type',
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
