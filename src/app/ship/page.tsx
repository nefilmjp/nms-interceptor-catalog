'use client';

import { Container } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useLocalStorage } from 'react-use';

import { Header } from '@/components/Header';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ShipContent } from '@/feature/ship/ShipContent';
import { ShipHeader } from '@/feature/ship/ShipHeader';
import { CatalogSettings, defaultSettings } from '@/store/CatalogContext';
import { ShipContext } from '@/store/ShipContext';

export default function Ship() {
  const searchParams = useSearchParams();

  const [settings, setSettings] = useLocalStorage<CatalogSettings>(
    'settings',
    defaultSettings,
  );

  const shipId = useMemo(() => {
    const shipId = searchParams.get('id');
    if (typeof shipId === 'string' && shipId.length === 8) return shipId;
    return null;
  }, [searchParams]);

  const value = useMemo(
    () =>
      settings
        ? {
            settings,
            setSettings,
          }
        : null,
    [settings, setSettings],
  );

  if (!value) return <LoadingSpinner />;

  console.log(value);

  return (
    <ShipContext.Provider value={value}>
      <Header>
        <ShipHeader />
      </Header>
      <main>
        <Container maxW='1024px' pb='6' width='100%'>
          {shipId && <ShipContent shipId={shipId} />}
        </Container>
      </main>
    </ShipContext.Provider>
  );
}
