import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Tooltip,
  Portal,
  useDisclosure,
  Button,
  SimpleGrid,
  FormControl,
  Switch,
  useColorMode,
  FormLabel,
} from '@chakra-ui/react';
import { useContext, useRef } from 'react';
import { FaGear } from 'react-icons/fa6';

import { CommonContext } from '@/store/CommonContext';

export const SettingsButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const { settings, setSettings } = useContext(CommonContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Tooltip hasArrow label='Settings'>
        <IconButton
          aria-label='Settings'
          icon={<FaGear />}
          onClick={onOpen}
          ref={btnRef}
        />
      </Tooltip>
      <Portal>
        <Drawer
          finalFocusRef={btnRef}
          isOpen={isOpen}
          onClose={onClose}
          placement='right'
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Settings</DrawerHeader>

            <DrawerBody>
              <SimpleGrid row={1} spacing={4}>
                <FormControl alignItems='center' display='flex'>
                  <Switch
                    id='color-mode'
                    isChecked={colorMode === 'dark' ? true : false}
                    onChange={toggleColorMode}
                  />
                  <FormLabel htmlFor='color-mode' mb='0' ml='4'>
                    Dark mode
                  </FormLabel>
                </FormControl>
                <FormControl alignItems='center' display='flex'>
                  <Switch
                    id='profile-nmsge'
                    isChecked={settings.partsName === 'nmsge' ? true : false}
                    onChange={(event) => {
                      if (event.target.checked)
                        setSettings({ ...settings, partsName: 'nmsge' });
                      else setSettings({ ...settings, partsName: 'default' });
                    }}
                  />
                  <FormLabel htmlFor='profile-nmsge' mb='0' ml='4'>
                    Use NMSGE compatible parts names
                  </FormLabel>
                </FormControl>
              </SimpleGrid>
            </DrawerBody>

            <DrawerFooter>
              <Button onClick={onClose}>Close</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Portal>
    </>
  );
};
