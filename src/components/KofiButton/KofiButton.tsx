import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { FaCoffee } from 'react-icons/fa';

export const KofiButton = (props: { isMenu?: boolean }) => {
  const { isMenu } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip
        hasArrow
        label='Donate'
        placement={isMenu ? 'bottom-end' : 'top-end'}
      >
        <IconButton aria-label='Ko-fi' icon={<FaCoffee />} onClick={onOpen} />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size='sm'>
        <ModalOverlay />
        <ModalContent overflow='hidden'>
          <ModalCloseButton color='#192025' zIndex='2' />
          <ModalBody padding='0'>
            <iframe
              height='712'
              id='kofiframe'
              src='https://ko-fi.com/nefilm/?hidefeed=true&widget=true&embed=true&preview=true'
              title='nefilm'
              style={{
                border: 'none',
                width: '100%',
                padding: '4px',
                background: '#f9f9f9',
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
