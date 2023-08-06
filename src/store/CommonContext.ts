/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';

import { PARTS_PROFILES, THUMB_SIZES } from '@/config';
import { PARTS_DEFAULT } from '@/config/profiles/default';

import type { ShipData } from '@/types';

export interface AppSettings {
  thumbSize: keyof typeof THUMB_SIZES;
  showPrivate: boolean;
  onlyFavorites: boolean;
  favorites: string[];
  rearView: boolean;
  partsName: keyof typeof PARTS_PROFILES;
}

export const defaultSettings: AppSettings = {
  thumbSize: 'b',
  showPrivate: false,
  onlyFavorites: false,
  favorites: [],
  rearView: false,
  partsName: 'default',
};

export interface CommonContext {
  settings: AppSettings;
  setSettings: (settings: AppSettings) => void;
  parts: typeof PARTS_DEFAULT;
  db: LokiConstructor | undefined;
  coll: Collection<ShipData> | undefined;
}

export const CommonContext = createContext<CommonContext>({
  settings: defaultSettings,
  setSettings: function (_settings: AppSettings): void {
    throw new Error('Function not implemented.');
  },
  parts: PARTS_PROFILES.default,
  db: undefined,
  coll: undefined,
});
