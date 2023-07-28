import { LokiLocalStorageAdapter } from 'lokijs';
import LZstring from 'lz-string';

export const initLokiAdaptor = () => {
  const LokiCompressedLocalStorageAdapter = LokiLocalStorageAdapter;

  LokiCompressedLocalStorageAdapter.prototype.loadDatabase = function (
    dbname,
    callback,
  ) {
    const serializedDb = LZstring.decompressFromEncodedURIComponent(
      localStorage[dbname],
    );

    const success = true;

    if (success) {
      callback(serializedDb);
    } else {
      callback(new Error('There was a problem loading the database'));
    }
  };

  LokiCompressedLocalStorageAdapter.prototype.saveDatabase = function (
    dbname,
    dbstring,
    callback,
  ) {
    localStorage[dbname] = LZstring.compressToEncodedURIComponent(dbstring);

    const success = true;
    if (success) {
      callback(null);
    } else {
      callback(
        new Error('An error was encountered loading ' + dbname + ' database.'),
      );
    }
  };

  const adapter = new LokiCompressedLocalStorageAdapter();
  return adapter;
};
