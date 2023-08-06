'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { useMemo, type ReactNode } from 'react';
import { useLocalStorage } from 'react-use';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PARTS_PROFILES } from '@/config';
import { useDatabase } from '@/hooks/useDatabase';
import {
  type AppSettings,
  CommonContext,
  defaultSettings,
} from '@/store/CommonContext';

import type { ShipData } from '@/types';

export function Providers({ children }: { children: ReactNode }) {
  // Database
  const db = useDatabase();
  const coll = useMemo(
    () =>
      db?.collections.length ? db.getCollection<ShipData>('ships') : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [db?.collections.length],
  );

  // Settings
  const [settings, setSettings] = useLocalStorage<AppSettings>(
    'settings',
    defaultSettings,
  );

  // Parts Name
  const parts = useMemo(
    () => PARTS_PROFILES[settings?.partsName || 'default'],
    [settings?.partsName],
  );

  const value = useMemo(
    () =>
      settings && db
        ? {
            settings,
            setSettings,
            parts,
            db,
            coll,
          }
        : null,
    [coll, db, parts, setSettings, settings],
  );

  // Chakra UI
  const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  };
  const theme = extendTheme({ config });

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {!value ? (
          <LoadingSpinner />
        ) : (
          <CommonContext.Provider value={value}>
            {children}
          </CommonContext.Provider>
        )}
      </ChakraProvider>
    </CacheProvider>
  );
}
