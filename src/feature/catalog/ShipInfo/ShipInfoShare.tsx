import {
  Button,
  HStack,
  IconButton,
  Link,
  Tooltip,
  useBreakpointValue,
  useClipboard,
  useToast,
  useUpdateEffect,
} from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { FaCopy, FaExternalLinkAlt, FaHeart, FaRegHeart } from 'react-icons/fa';

import { getShortId } from '@/utils/getShortId';

import type { AppSettings } from '@/store/CommonContext';
import type { ShipData } from '@/types';

interface ShipInfoShareProps {
  data: ShipData;
  isSingle?: boolean | undefined;
  settings: AppSettings;
  setSettings: (settings: AppSettings) => void;
}

export const ShipInfoShare = ({ ...props }: ShipInfoShareProps) => {
  const { data, isSingle, settings, setSettings } = props;

  const { onCopy, setValue, hasCopied } = useClipboard('');

  const isFavorite = useMemo(
    () => (settings.favorites.includes(data.uuid) ? true : false),
    [data.uuid, settings.favorites],
  );

  const toast = useToast();

  useEffect(() => {
    setValue(
      `${location.protocol}//${location.host}/ship/${getShortId(data.uuid)}/`,
    );
  }, [data.uuid, setValue]);

  useUpdateEffect(() => {
    if (!hasCopied) return;
    toast({
      title: 'Copied',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  }, [hasCopied]);

  const shareURL = useMemo(
    () =>
      `${location.protocol}//${location.host}/ship/${getShortId(data.uuid)}/`,
    [data.uuid],
  );

  const isSmall = useBreakpointValue({ base: true, sm: false });

  if (!data) return null;

  return (
    <HStack ml='auto' mr='auto' mt='3'>
      {/* お気に入り */}
      <Tooltip
        hasArrow
        label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        placement={!isSingle && isSmall ? 'bottom-start' : 'bottom'}
      >
        <IconButton
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          icon={
            isFavorite ? (
              <FaHeart fill='var(--chakra-colors-pink-300)' />
            ) : (
              <FaRegHeart />
            )
          }
          onClick={() => {
            if (!settings.favorites) return;
            if (isFavorite) {
              setSettings({
                ...settings,
                favorites: [
                  ...settings.favorites.filter((id) => id !== data.uuid),
                ],
              });
            } else {
              setSettings({
                ...settings,
                favorites: [...settings.favorites, data.uuid],
              });
            }
          }}
        />
      </Tooltip>
      <Button onClick={onCopy} rightIcon={<FaCopy />}>
        {isSingle || !isSmall ? 'Copy share URL' : 'Copy URL'}
      </Button>
      {!isSingle && (
        <Link href={shareURL} isExternal={true}>
          <Button rightIcon={<FaExternalLinkAlt />}>
            {isSmall ? 'Open page' : 'Open share page'}
          </Button>
        </Link>
      )}
    </HStack>
  );
};
