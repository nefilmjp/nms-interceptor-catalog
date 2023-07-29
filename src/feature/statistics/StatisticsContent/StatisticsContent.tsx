import { Grid, Heading } from '@chakra-ui/react';

import { BodyStatDetail } from '../BodyStat';
import { BottomStat } from '../BottomStat';
import { ColorStat } from '../ColorStat';
import { HeadStat } from '../HeadStat';
import { SkirtStatDetail } from '../SkirtStat';
import { TopStat } from '../TopStat';

export const StatisticsContent = () => {
  return (
    <>
      <Heading mt={['2', '1', '0']} textAlign='center'>
        Statistics
      </Heading>
      <Grid
        gap={['2', '3', '4', '5', '6']}
        p={['2', '3', '4', '5', '6']}
        gridTemplateColumns={[
          'repeat(auto-fill, minmax(90%, 1fr))',
          'repeat(auto-fill, minmax(90%, 1fr))',
          'repeat(auto-fill, minmax(40%, 1fr))',
          'repeat(auto-fill, minmax(30%, 1fr))',
          'repeat(auto-fit, minmax(384px, 1fr))',
          'repeat(auto-fit, minmax(480px, 1fr))',
        ]}
      >
        <ColorStat shortPropName='primaryColor' />
        <ColorStat shortPropName='secondaryColor' />
        <HeadStat />
        <BodyStatDetail />
        <TopStat />
        <BottomStat />
        <SkirtStatDetail />
      </Grid>
    </>
  );
};
