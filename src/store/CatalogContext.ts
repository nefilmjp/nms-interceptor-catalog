/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';

import type { InterceptorQuery, ShipData } from '@/types';

interface CatalogContext {
  items: (ShipData & LokiObj)[];
  setItems: (items: (ShipData & LokiObj)[]) => void;
  intQuery: InterceptorQuery;
  setIntQuery: (query: InterceptorQuery) => void;
  mutate: () => void;
}

export const CatalogContext = createContext<CatalogContext>({
  items: [],
  setItems: function (_items: (ShipData & LokiObj)[]): void {
    throw new Error('Function not implemented.');
  },
  intQuery: {},
  setIntQuery: function (_query: InterceptorQuery): void {
    throw new Error('Function not implemented.');
  },
  mutate: function (): void {
    throw new Error('Function not implemented.');
  },
});
