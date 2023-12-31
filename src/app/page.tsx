'use client';

import { Container } from '@chakra-ui/react';
import { useContext, useMemo, useState } from 'react';

import { Header } from '@/components/Header';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { CatalogContent } from '@/feature/catalog/CatalogContent';
import { CatalogHeader } from '@/feature/catalog/CatalogHeader';
import { CatalogContext } from '@/store/CatalogContext';
import { CommonContext } from '@/store/CommonContext';
import { execQuery } from '@/utils/execQuery';

import type { InterceptorQuery, ShipData } from '@/types';

export default function Catalog() {
  const { settings, coll } = useContext(CommonContext);

  const [items, setItems] = useState<(ShipData & LokiObj)[]>([]);

  const [intQuery, setIntQuery] = useState<InterceptorQuery>({});

  const mutate = useMemo(
    () => () => setItems(execQuery(coll, intQuery, settings)),
    [coll, intQuery, settings],
  );

  const value = useMemo(
    () => ({
      intQuery,
      setIntQuery,
      items,
      setItems,
      mutate,
    }),
    [intQuery, items, mutate],
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
