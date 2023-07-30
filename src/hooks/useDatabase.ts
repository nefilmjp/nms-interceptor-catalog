import loki from 'lokijs';
import LZstring from 'lz-string';
import { useState } from 'react';
import { useMount } from 'react-use';

import { initLokiAdaptor } from '@/utils/initLokiAdaptor';

import type { ShipData } from '@/types';

export const useDatabase = (): loki | undefined => {
  const [db, setDb] = useState<Loki>();

  useMount(async () => {
    const adapter = initLokiAdaptor();

    const db = new loki('interceptor.db', {
      env: 'BROWSER',
      adapter,
      autoload: true,
      autoloadCallback: async () => {
        // ファイルから最新のデータの更新日時を取得
        const json: string = await fetch(`/data/lastModified.json`)
          .then((res) => res.json())
          .catch();
        const latetestTimestamp = new Date(json).getTime();

        // 使用中のデータの更新日時を取得
        const currentModified = localStorage.getItem('updatedAt');

        // 比較して新しければshipsコレクションをクリア
        if (
          currentModified &&
          new Date(currentModified).getTime() < latetestTimestamp &&
          db.getCollection('ships') !== null
        ) {
          db.removeCollection('ships');
        }
        localStorage.setItem('updatedAt', json);

        // shipsコレクションが空ならファイルから取得する
        if (db.getCollection('ships') === null) {
          // コレクション作成
          const coll = db.addCollection<ShipData>('ships', {
            unique: ['uuid'],
            indices: ['address'],
          });

          // ArrayBuffer->Uint8Array->String->JSON->Collection
          const buffer: ArrayBuffer = await fetch(`/data/interceptor.db`)
            .then((res) => res.arrayBuffer())
            .catch();
          const jsonString = LZstring.decompressFromUint8Array(
            new Uint8Array(buffer),
          );
          const json: ShipData[] = JSON.parse(jsonString);
          json.forEach((ship) => {
            coll.insert(ship);
          });

          // 保存
          db.saveDatabase();
        }

        // 準備完了
        setDb(db);
      },
    });
  });

  return db;
};
