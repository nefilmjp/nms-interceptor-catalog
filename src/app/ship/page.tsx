'use client';

import { Container } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { Header } from '@/components/Header';
import { ShipContent } from '@/feature/ship/ShipContent';
import { ShipHeader } from '@/feature/ship/ShipHeader';

export default function Ship() {
  const searchParams = useSearchParams();

  console.log('searchParams', searchParams);

  const shipId = useMemo(() => {
    const shipId = searchParams.get('id');
    if (typeof shipId === 'string' && shipId.length === 8) return shipId;
    return null;
  }, [searchParams]);

  return (
    <>
      <Header>
        <ShipHeader />
      </Header>
      <main>
        <Container maxW='1024px' pb='6' width='100%'>
          {shipId && <ShipContent shipId={shipId} />}
        </Container>
      </main>
    </>
  );
}
