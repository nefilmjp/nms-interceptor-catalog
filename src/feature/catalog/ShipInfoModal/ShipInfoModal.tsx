import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Portal,
  Link,
  Box,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { CommonContext } from '@/store/CommonContext';

import { ShipInfo } from '../ShipInfo';

import type { ShipData } from '@/types';

interface ShipInfoModalProps {
  shipId: string | null;
  setShipId: (shipId: string | null) => void;
}

export const ShipInfoModal = (props: ShipInfoModalProps) => {
  const { shipId, setShipId } = props;

  const { coll, settings, setSettings, parts } = useContext(CommonContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [shipData, setShipData] = useState<ShipData | null>(null);

  useEffect(() => {
    if (!shipId) return;
    if (!coll) return;
    const shipData = coll.findOne({ shipId: { $eq: shipId } });
    if (!shipData) return;
    setShipData(shipData);
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipId]);

  return (
    <Portal>
      <Modal
        isOpen={isOpen}
        size='4xl'
        onClose={() => {
          setShipId(null);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent backgroundColor='chakra-body-bg' borderRadius='md'>
          <ModalCloseButton zIndex={2} />
          <ModalBody position='relative' pt='4' zIndex={1}>
            <ShipInfo
              data={shipData}
              parts={parts}
              setSettings={setSettings}
              settings={settings}
            />
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
                setShipId(null);
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
