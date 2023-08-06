/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Center } from '@chakra-ui/react';
import { useContext, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { CHART_COLOR } from '@/config';
import { CommonContext } from '@/store/CommonContext';

import type { Interceptor } from '@/types';

export const HeadStat = () => {
  const { coll, parts } = useContext(CommonContext);

  const propName = 'interceptor.head' as keyof Interceptor;

  const values = useMemo(
    () => [
      ...Object.keys(parts.head).map((key) =>
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
      datasets: [
        {
          data: values,
          backgroundColor: [
            CHART_COLOR.blue,
            CHART_COLOR.red,
            CHART_COLOR.green,
            CHART_COLOR.gray,
          ],
          labels: values[3]
            ? [...Object.values(parts.head), '(Not set)']
            : Object.values(parts.head),
        },
      ],
    }),
    [parts.head, values],
  );

  return (
    <Center backgroundColor='white' borderRadius='8' borderWidth='1px' pb='4'>
      <Doughnut
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Head (n=${coll!.count()})`,
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
