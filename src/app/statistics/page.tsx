'use client';

import { Container } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  Title,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Header } from '@/components/Header';
import { StatisticsContent } from '@/feature/statistics/StatisticsContent';
import { StatisticsHeader } from '@/feature/statistics/StatisticsHeader';

ChartJS.register(ArcElement, Tooltip, Legend, Colors, ChartDataLabels, Title);

export default function Catalog() {
  return (
    <>
      <Header>
        <StatisticsHeader />
      </Header>
      <main>
        <Container minW='full' p='unset'>
          <StatisticsContent />
        </Container>
      </main>
    </>
  );
}
