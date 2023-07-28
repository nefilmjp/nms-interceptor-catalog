import { CatalogSettings } from '@/store/CatalogContext';

import type { InterceptorQuery, ShipData } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseQuery = (query: Record<string, any>, parentProp?: string) => {
  const prefix = parentProp ? `${parentProp}.` : '';
  return Object.entries(query).reduce<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, LokiQuery<any>>
  >((acc, [key, value]) => {
    // console.log(key, value);
    if (Array.isArray(value)) {
      if (value.length > 0) {
        if (value.length === 1 && value[0] === -1)
          acc[`${prefix}${key}`] = { $exists: false };
        else if (value.includes(-1))
          acc[`${prefix}${key}`] = {
            $or: [{ $in: value }, { $exists: false }],
          };
        else acc[`${prefix}${key}`] = { $in: value };
      }
    } else if (['string', 'number', 'boolean'].includes(typeof value)) {
      if (value) acc[`${prefix}${key}`] = { $eq: value };
    }
    return acc;
  }, {});
};

export const execQuery = (
  coll: Collection<ShipData> | undefined,
  intQuery: InterceptorQuery,
  settings: CatalogSettings,
): (ShipData & LokiObj)[] => {
  if (!coll) {
    return [];
  }
  const queryObj = parseQuery(intQuery, 'interceptor');

  if (settings.showPrivate !== true) queryObj['availability'] = { $eq: 1 };
  if (settings.onlyFavorites === true)
    queryObj['uuid'] = { $in: settings.favorites };

  const res = coll.chain().find(queryObj).data();
  return res;
};
