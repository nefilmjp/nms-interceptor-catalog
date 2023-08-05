import clsx from 'clsx';
import {
  CSSProperties,
  KeyboardEventHandler,
  useContext,
  useMemo,
} from 'react';
import { ImLock, ImHeart, ImBubbles4 } from 'react-icons/im';

import { THUMB_SIZES } from '@/config';
import { CatalogContext } from '@/store/CatalogContext';

import styles from './ShipList.module.scss';

import type { ShipData } from '@/types';

interface ShipListItemProps {
  data: ShipData;
  onKeyDown: KeyboardEventHandler<HTMLButtonElement>;
  onClick: (uuid: string) => void;
  style: CSSProperties;
}

export const ShipListItem = ({ ...props }: ShipListItemProps) => {
  const { data, onKeyDown, onClick, style } = props;
  const { settings } = useContext(CatalogContext);

  const thumbIndex = useMemo(() => {
    if (!data.imageIds || !settings.rearView) return 0;
    if (settings.rearView && data.imageIds.length > 1) return 1;
    return 0;
  }, [data.imageIds, settings.rearView]);

  const src = useMemo(() => {
    if (!data.imageIds) return `/assets/images/empty.png`;
    return `https://i.imgur.com/${data.imageIds[thumbIndex]}${
      settings.thumbSize
    }.${THUMB_SIZES[settings.thumbSize].ext}`;
  }, [data.imageIds, settings.thumbSize, thumbIndex]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <button
      className={clsx(styles.thumbButton)}
      onClick={() => onClick(data.uuid)}
      onKeyDown={onKeyDown}
      style={style}
    >
      <>
        {data.availability === 2 && (
          <ImLock
            className={styles.availIcon}
            fill='var(--chakra-colors-white)'
          />
        )}
        {data.availability === 3 && (
          <ImBubbles4
            className={styles.availIcon}
            fill='var(--chakra-colors-white)'
          />
        )}
        {settings.favorites && settings.favorites.includes(data.uuid) && (
          <ImHeart
            className={styles.favIcon}
            fill='var(--chakra-colors-white)'
          />
        )}
        <img
          alt=''
          className={styles.thumb}
          height={THUMB_SIZES[settings.thumbSize].h}
          src={src}
          width={THUMB_SIZES[settings.thumbSize].w}
        />
      </>
    </button>
  );
};
