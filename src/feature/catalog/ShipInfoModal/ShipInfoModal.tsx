import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Portal,
  Link,
  Box,
  FormControl,
  Switch,
  FormLabel,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { DatabaseContext } from '@/app/providers';
import { CatalogContext } from '@/store/CatalogContext';

import { ShipInfo } from '../ShipInfo';

import type { ShipData } from '@/types';

interface ShipInfoModalProps {
  uuid: string | null;
  setUuid: (uuid: string | null) => void;
}

export const ShipInfoModal = (props: ShipInfoModalProps) => {
  const { uuid, setUuid } = props;

  const { coll } = useContext(DatabaseContext);
  const { settings, setSettings } = useContext(CatalogContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [shipData, setShipData] = useState<ShipData | null>(null);

  useEffect(() => {
    if (!uuid) return;
    if (!coll) return;
    const shipData = coll.findOne({ uuid: { $eq: uuid } });
    if (!shipData) return;
    setShipData(shipData);
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  return (
    <Portal>
      <Modal
        isOpen={isOpen}
        size='4xl'
        onClose={() => {
          setUuid(null);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>
            <HStack>
              <Text>Specification</Text>
              <Box ml='auto' mr='8'>
                <FormControl alignItems='center' display='flex'>
                  <FormLabel htmlFor='show-private' mb='0' ml='4'>
                    Favorite
                  </FormLabel>
                  <Switch
                    id='show-private'
                    isChecked={
                      favorites?.includes(shortId || '') ? true : false
                    }
                    onChange={(event) => {
                      if (!favorites || !shortId) return;
                      if (event.target.checked) {
                        setFavorites([...favorites, shortId]);
                      } else {
                        setFavorites(favorites.filter((id) => id !== shortId));
                      }
                    }}
                  />
                </FormControl>
              </Box>
            </HStack>
          </ModalHeader> */}
          <ModalCloseButton zIndex={2} />
          <ModalBody position='relative' pt='4' zIndex={1}>
            <FormControl
              alignItems='center'
              display='flex'
              justifyContent='flex-end'
              position='absolute'
              right='16'
              top='6'
              width='100px'
            >
              <FormLabel htmlFor='show-private' mb='0' ml='4'>
                Favorite
              </FormLabel>
              {shipData && (
                <Switch
                  id='show-private'
                  isChecked={
                    settings.favorites.includes(shipData.uuid) ? true : false
                  }
                  onChange={(event) => {
                    if (!settings.favorites) return;
                    if (event.target.checked) {
                      setSettings({
                        ...settings,
                        favorites: [...settings.favorites, shipData.uuid],
                      });
                    } else {
                      setSettings({
                        ...settings,
                        favorites: [
                          ...settings.favorites.filter(
                            (id) => id !== shipData.uuid,
                          ),
                        ],
                      });
                    }
                  }}
                />
              )}
            </FormControl>
            <SimpleGrid columns={1} spacing={4}>
              <ShipInfo data={shipData} />
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Box mr='4'>
              <Link href='https://ko-fi.com/D1D7N4R45' isExternal={true}>
                <img
                  alt='Buy Me a Coffee at ko-fi.com'
                  height='36'
                  src='https://storage.ko-fi.com/cdn/kofi1.png?v=3'
                  width='143'
                />
              </Link>
            </Box>
            <Button
              mr={3}
              variant='outline'
              onClick={() => {
                setUuid(null);
                onClose();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Portal>
  );
};
