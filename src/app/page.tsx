'use client';

import { Container } from '@chakra-ui/react';
import { useContext, useMemo, useState } from 'react';
import { useLocalStorage } from 'react-use';

import { Header } from '@/components/Header';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { CatalogContent } from '@/feature/catalog/CatalogContent';
import { CatalogHeader } from '@/feature/catalog/CatalogHeader';
import {
  CatalogContext,
  CatalogSettings,
  defaultSettings,
} from '@/store/CatalogContext';
import { execQuery } from '@/utils/execQuery';

import { DatabaseContext } from './providers';

import type { InterceptorQuery, ShipData } from '@/types';

export default function Catalog() {
  const { coll } = useContext(DatabaseContext);

  // const [settings, setSettings] = useState<CatalogSettings>(defaultSettings);
  const [settings, setSettings] = useLocalStorage<CatalogSettings>(
    'settings',
    defaultSettings,
  );

  const [items, setItems] = useState<(ShipData & LokiObj)[]>([]);

  const [intQuery, setIntQuery] = useState<InterceptorQuery>({});

  const mutate = useMemo(
    () =>
      settings ? () => setItems(execQuery(coll, intQuery, settings)) : null,
    [coll, intQuery, settings],
  );

  const value = useMemo(
    () =>
      settings && mutate
        ? {
            settings,
            setSettings,
            intQuery,
            setIntQuery,
            items,
            setItems,
            mutate,
          }
        : null,
    [settings, setSettings, intQuery, items, mutate],
  );

  if (!value) return <LoadingSpinner />;

  return (
    <CatalogContext.Provider value={value}>
      <Header>
        <CatalogHeader />
      </Header>
      <main>
        <Container minW='full' p='unset'>
          <CatalogContent />
        </Container>
      </main>
    </CatalogContext.Provider>
  );
}
