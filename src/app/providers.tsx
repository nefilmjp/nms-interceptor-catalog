'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme, useToast } from '@chakra-ui/react';
import { useMemo, type ReactNode, useEffect } from 'react';
import { useLocalStorage } from 'react-use';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PARTS_PROFILES } from '@/config';
import { useDatabase } from '@/hooks/useDatabase';
import { useNotice } from '@/hooks/useNotice';
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

  // Notice
  const notice = useNotice();

  // Common context
  const value: CommonContext | null = useMemo(
    () =>
      settings && db
        ? {
            settings,
            setSettings,
            parts,
            db,
            coll,
            notice,
          }
        : null,
    [coll, db, parts, setSettings, settings, notice],
  );

  // Chakra UI
  const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  };
  const theme = extendTheme({ config });

  // Toast
  const toast = useToast();
  const id = 'notice-toast';
  useEffect(() => {
    if (!toast || !notice || toast.isActive(id)) return;
    toast({
      ...notice,
      id,
    });
  }, [notice, toast]);

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
