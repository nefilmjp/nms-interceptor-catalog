import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useScrollbarWidth, useWindowSize } from 'react-use';
import { CollectionCellSizeAndPosition, Collection } from 'react-virtualized';

import { THUMB_SIZES } from '@/config';
import { CatalogContext } from '@/store/CatalogContext';
import { CommonContext } from '@/store/CommonContext';

import { ShipInfoModal } from '../ShipInfoModal';
import { ShipListItem } from '../ShipListItem';

export const ShipList = () => {
  const { settings } = useContext(CommonContext);
  const { items } = useContext(CatalogContext);

  const itemMaxWidth = useMemo(
    () => THUMB_SIZES[settings.thumbSize].w,
    [settings],
  );
  const itemAspectRatioX = THUMB_SIZES[settings.thumbSize].w;
  const itemAspectRatioY = THUMB_SIZES[settings.thumbSize].h;

  const gridRef = useRef<Collection | null>(null);

  const { width, height } = useWindowSize();
  const scrollBarWidth = useScrollbarWidth();
  const outerWidth = useMemo(() => width, [width]);
  const outerHeight = useMemo(() => height - 56, [height]);
  const innerWidth = useMemo(
    () => outerWidth - (scrollBarWidth || 0),
    [outerWidth, scrollBarWidth],
  );
  const columnNum = useMemo(
    () => Math.ceil(innerWidth / itemMaxWidth),
    [itemMaxWidth, innerWidth],
  );
  const itemWidth = useMemo(
    () => Math.min(THUMB_SIZES[settings.thumbSize].w, innerWidth / columnNum),
    [settings.thumbSize, innerWidth, columnNum],
  );
  const itemHeight = useMemo(
    () => (itemWidth / itemAspectRatioX) * itemAspectRatioY,
    [itemAspectRatioX, itemAspectRatioY, itemWidth],
  );

  useEffect(() => {
    gridRef.current?.recomputeCellSizesAndPositions();
  }, [itemHeight]);

  const [uuid, setUuid] = useState<string | null>(null);

  return (
    <>
      <ShipInfoModal setUuid={setUuid} uuid={uuid} />
      <Collection
        cellCount={items.length}
        height={outerHeight}
        ref={gridRef}
        width={outerWidth}
        cellRenderer={({ index, key, style }) => {
          return (
            <ShipListItem
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              data={items[index]!}
              key={key}
              onClick={(uuid: string) => setUuid(uuid)}
              style={style}
              onKeyDown={(event) => {
                const target = event.currentTarget as HTMLButtonElement;
                const parent = target.parentElement as HTMLDivElement;
                const children = parent.children;
                const itemsArray = Array.from(children);
                const currentIndex = itemsArray.findIndex(
                  (item) => item === target,
                );
                switch (event.key) {
                  case 'ArrowRight': // 次
                    event.preventDefault();
                    (target.nextElementSibling as HTMLButtonElement)?.focus();
                    break;
                  case 'ArrowLeft': // 前
                    event.preventDefault();
                    (
                      target.previousElementSibling as HTMLButtonElement
                    )?.focus();
                    break;
                  case 'ArrowDown': // 下
                    event.preventDefault();
                    (
                      children.item(
                        Math.min(currentIndex + columnNum, children.length - 1),
                      ) as HTMLButtonElement
                    )?.focus();
                    break;
                  case 'ArrowUp': // 上
                    event.preventDefault();
                    (
                      children.item(
                        Math.max(currentIndex - columnNum, 0),
                      ) as HTMLButtonElement
                    )?.focus();
                    break;
                  case 'End': // 行末
                    event.preventDefault();
                    (
                      children.item(
                        Math.min(
                          currentIndex +
                            (columnNum - (currentIndex % columnNum)) -
                            1,
                          children.length - 1,
                        ),
                      ) as HTMLButtonElement
                    )?.focus();
                    break;
                  case 'Home': // 行頭
                    event.preventDefault();
                    (
                      children.item(
                        Math.max(currentIndex - (currentIndex % columnNum), 0),
                      ) as HTMLButtonElement
                    )?.focus();
                    break;
                  case 'PageDown': // 次画面
                    event.preventDefault();
                    (
                      children.item(
                        Math.min(
                          children.length -
                            (columnNum - (currentIndex % columnNum)),
                          children.length - 1,
                        ),
                      ) as HTMLButtonElement
                    )?.focus();
                    break;
                  case 'PageUp': // 前画面
                    event.preventDefault();
                    (
                      children.item(
                        Math.max(currentIndex % columnNum, 0),
                      ) as HTMLButtonElement
                    )?.focus();
                    break;
                }
              }}
            />
          );
        }}
        cellSizeAndPositionGetter={({
          index,
        }): CollectionCellSizeAndPosition => ({
          height: itemHeight,
          width: itemWidth,
          x: (index % columnNum) * itemWidth,
          y: Math.floor(index / columnNum) * itemHeight,
        })}
      />
    </>
  );
};
