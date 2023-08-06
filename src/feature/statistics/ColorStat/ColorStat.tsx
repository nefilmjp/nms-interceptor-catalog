/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Center } from '@chakra-ui/react';
import { useContext, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { CommonContext } from '@/store/CommonContext';

import type { Interceptor } from '@/types';

interface ColroStatProps {
  shortPropName: 'primaryColor' | 'secondaryColor';
}

export const ColorStat = ({ ...props }: ColroStatProps) => {
  const { shortPropName } = props;
  const { coll, parts } = useContext(CommonContext);

  const propName = `interceptor.${shortPropName}` as keyof Interceptor;
  const text = useMemo(
    () =>
      shortPropName === 'primaryColor' ? 'Primary Color' : 'Secondary Color',
    [shortPropName],
  );
  const colors = useMemo(
    () =>
      shortPropName === 'primaryColor'
        ? parts.primaryColor
        : parts.secondaryColor,
    [parts, shortPropName],
  );

  const values = useMemo(
    () => [
      ...Object.keys(colors).map((key) =>
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
    [coll, colors, propName],
  );

  const data = useMemo(
    () => ({
      datasets: [
        {
          data: values,
          backgroundColor: [
            '#ddbbdd',
            '#eeeeee',
            '#ffddbb',
            '#ffcccc',
            '#bbddff',
            '#ccffcc',
            '#ffffcc',
            '#ffddee',
            '#cccccc',
            '#dddddd',
          ],
          labels: values[9]
            ? [...Object.values(colors), '(Not set)']
            : Object.values(colors),
        },
      ],
    }),
    [colors, values],
  );

  return (
    <Center backgroundColor='white' borderRadius='8' borderWidth='1px' pb='4'>
      <Doughnut
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: `${text} (n=${coll!.count()})`,
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
