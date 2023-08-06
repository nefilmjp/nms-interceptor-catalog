/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Center } from '@chakra-ui/react';
import { useContext, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { CHART_COLOR, CHART_COLOR_ARRAY } from '@/config';
import { CommonContext } from '@/store/CommonContext';

import type { Interceptor } from '@/types';

export const SkirtStatDetail = () => {
  const { coll, parts } = useContext(CommonContext);

  const propName = 'interceptor.skirtType' as keyof Interceptor;
  const propNameWing = 'interceptor.skirtColored' as keyof Interceptor;

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

  const valueColor = useMemo(
    () => [
      ...Object.keys(parts.skirtType)
        .map((skirt) => [
          ...[0, 1]
            .map((color) =>
              coll!
                .chain()
                .find({
                  $and: [
                    { [propName]: { $eq: parseInt(skirt, 10) } },
                    { [propNameWing]: { $eq: color } },
                  ],
                })
                .count(),
            )
            .flat(),
          coll!
            .chain()
            .find({
              $and: [
                { [propName]: { $eq: parseInt(skirt, 10) } },
                { [propNameWing]: { $exists: false } },
              ],
            })
            .count(),
        ])
        .flat(),
      ...[0, 1]
        .map((color) =>
          coll!
            .chain()
            .find({
              $and: [
                { [propName]: { $exists: false } },
                { [propNameWing]: { $eq: color } },
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
    [coll, parts.skirtType],
  );

  const data = useMemo(
    () => ({
      datasets: [
        {
          labels: [
            'Black',
            'Painted',
            '(Not set)',
            'Black',
            'Painted',
            '(Not set)',
            'Black',
            'Painted',
            '(Not set)',
            'Black',
            'Painted',
            '(Not set)',
            'Black',
            'Painted',
            '(Not set)',
            'Black',
            'Painted',
            '(Not set)',
          ],
          data: valueColor,
          backgroundColor: [
            CHART_COLOR.lightBlue,
            CHART_COLOR.lightRed,
            CHART_COLOR.gray,
          ],
        },
        {
          labels: values[6]
            ? [...Object.values(parts.skirtType), '(Not set)']
            : Object.values(parts.skirtType),
          data: values,
          backgroundColor: CHART_COLOR_ARRAY,
        },
      ],
    }),
    [valueColor, values, parts.skirtType],
  );

  return (
    <Center backgroundColor='white' borderRadius='8' borderWidth='1px' pb='4'>
      <Doughnut
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Skirt/Color (n=${coll!.count()})`,
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
