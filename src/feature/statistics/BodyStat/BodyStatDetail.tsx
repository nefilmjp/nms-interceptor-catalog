/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Center } from '@chakra-ui/react';
import { useContext, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { DatabaseContext } from '@/app/providers';
import { CHART_COLOR, CHART_COLOR_ARRAY } from '@/config';
import { PARTS_BODY_TYPE } from '@/config/parts';

import type { Interceptor } from '@/types';

export const BodyStatDetail = () => {
  const { coll } = useContext(DatabaseContext);

  const propName = 'interceptor.bodyType' as keyof Interceptor;
  const propNameWing = 'interceptor.bodyWing' as keyof Interceptor;

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

  const valuesWing = useMemo(
    () => [
      ...Object.keys(PARTS_BODY_TYPE)
        .map((body) => [
          ...[0, 1, 2]
            .map((wing) =>
              coll!
                .chain()
                .find({
                  $and: [
                    { [propName]: { $eq: parseInt(body, 10) } },
                    { [propNameWing]: { $eq: wing } },
                  ],
                })
                .count(),
            )
            .flat(),
          coll!
            .chain()
            .find({
              $and: [
                { [propName]: { $eq: parseInt(body, 10) } },
                { [propNameWing]: { $exists: false } },
              ],
            })
            .count(),
        ])
        .flat(),
      ...[0, 1, 2]
        .map((wing) =>
          coll!
            .chain()
            .find({
              $and: [
                { [propName]: { $exists: false } },
                { [propNameWing]: { $eq: wing } },
              ],
            })
            .count(),
        )
        .flat(),
      coll!
        .chain()
        .find({
          $and: [
            { [propName]: { $exists: false } },
            { [propNameWing]: { $exists: false } },
          ],
        })
        .count(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const data = useMemo(
    () => ({
      datasets: [
        {
          labels: [
            'None',
            'Black',
            'Painted',
            '(Not set)',
            'None',
            'Black',
            'Painted',
            '(Not set)',
            'None',
            'Black',
            'Painted',
            '(Not set)',
            'None',
            'Black',
            'Painted',
            '(Not set)',
            'None',
            'Black',
            'Painted',
            '(Not set)',
          ],
          data: valuesWing,
          backgroundColor: [
            CHART_COLOR.gray,
            CHART_COLOR.lightBlue,
            CHART_COLOR.lightRed,
            CHART_COLOR.gray,
          ],
        },
        {
          labels: values[5]
            ? [...Object.values(PARTS_BODY_TYPE), '(Not set)']
            : Object.values(PARTS_BODY_TYPE),
          data: values,
          backgroundColor: CHART_COLOR_ARRAY,
        },
      ],
    }),
    [values, valuesWing],
  );

  return (
    <Center backgroundColor='white' borderRadius='8' borderWidth='1px' pb='4'>
      <Doughnut
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Body/Rear Wing (n=${coll!.count()})`,
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
