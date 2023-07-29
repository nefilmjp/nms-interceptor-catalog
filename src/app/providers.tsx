'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createContext, useMemo, type ReactNode } from 'react';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useDatabase } from '@/hooks/useDatabase';

import type { ShipData } from '@/types';

interface DatabaseContext {
  db: LokiConstructor | undefined;
  coll: Collection<ShipData> | undefined;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export const DatabaseContext = createContext<DatabaseContext>({
  db: undefined,
  coll: undefined,
});
/* eslint-enable @typescript-eslint/no-unused-vars */

export function Providers({ children }: { children: ReactNode }) {
  const db = useDatabase();
  const coll = useMemo(
    () =>
      db?.collections.length ? db.getCollection<ShipData>('ships') : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [db?.collections.length],
  );

  const value = useMemo(
    () => ({
      db,
      coll,
    }),
    [coll, db],
  );

  const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  };
  const theme = extendTheme({ config });

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <DatabaseContext.Provider value={value}>
          {!db ? <LoadingSpinner /> : children}
        </DatabaseContext.Provider>
      </ChakraProvider>
    </CacheProvider>
  );
}
