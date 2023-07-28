/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Center } from '@chakra-ui/react';
import { useContext, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { DatabaseContext } from '@/app/providers';
import { CHART_COLOR_ARRAY } from '@/config';
import { PARTS_BOTTOM_TYPE } from '@/config/parts';

import type { Interceptor } from '@/types';

export const BottomStat = () => {
  const { coll } = useContext(DatabaseContext);

  const propName = 'interceptor.bottomType' as keyof Interceptor;

  const values = useMemo(
    () => [
      ...Object.keys(PARTS_BOTTOM_TYPE).map((key) =>
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
          backgroundColor: CHART_COLOR_ARRAY,
          labels: values[3]
            ? [...Object.values(PARTS_BOTTOM_TYPE), '(Not set)']
            : Object.values(PARTS_BOTTOM_TYPE),
        },
      ],
    }),
    [values],
  );

  return (
    <Center backgroundColor='white' borderRadius='8' borderWidth='1px' pb='4'>
      <Doughnut
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Bottom Structure (n=${coll!.count()})`,
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
