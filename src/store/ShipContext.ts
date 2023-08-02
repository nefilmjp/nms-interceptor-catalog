/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';

import { defaultSettings, type CatalogSettings } from './CatalogContext';

interface ShipContext {
  settings: CatalogSettings;
  setSettings: (settings: CatalogSettings) => void;
}

export const ShipContext = createContext<ShipContext>({
  settings: defaultSettings,
  setSettings: function (_settings: CatalogSettings): void {
    throw new Error('Function not implemented.');
  },
});
