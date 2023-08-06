/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Center } from '@chakra-ui/react';
import { useContext, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { CHART_COLOR_ARRAY } from '@/config';
import { CommonContext } from '@/store/CommonContext';

import type { Interceptor } from '@/types';

export const TopStat = () => {
  const { coll, parts } = useContext(CommonContext);

  const propName = 'interceptor.topType' as keyof Interceptor;

  const values = useMemo(
    () => [
      ...Object.keys(parts.topType).map((key) =>
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
    [coll, parts.topType],
  );

  const data = useMemo(
    () => ({
      datasets: [
        {
          data: values,
          backgroundColor: CHART_COLOR_ARRAY,
          labels: values[3]
            ? [...Object.values(parts.topType), '(Not set)']
            : Object.values(parts.topType),
        },
      ],
    }),
    [parts.topType, values],
  );

  return (
    <Center backgroundColor='white' borderRadius='8' borderWidth='1px' pb='4'>
      <Doughnut
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Top Structure (n=${coll!.count()})`,
            },
            datalabels: {
              textAlign: 'center',
              formatter(value, context) {
                if (!value) return '';
                return `${
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (context.dataset as any).labels![context.dataIndex]
                }\n${Math.round(((value * 10) / coll!.count()) * 100) / 10}%`;
              },
            },
          },
        }}
      />
    </Center>
  );
};
