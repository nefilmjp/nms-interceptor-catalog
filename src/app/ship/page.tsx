'use client';

import { Container } from '@chakra-ui/react';

import { Header } from '@/components/Header';
import { ShipContent } from '@/feature/ship/ShipContent';
import { ShipHeader } from '@/feature/ship/ShipHeader';

export default function Ship() {
  return (
    <>
      <Header>
        <ShipHeader />
      </Header>
      <main>
        <Container maxW='1024px' pb='6' width='100%'>
          <ShipContent />
        </Container>
      </main>
    </>
  );
}
