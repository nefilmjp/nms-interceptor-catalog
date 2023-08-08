import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
  Portal,
  HStack,
  Box,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa6';

import { ColorButton } from '../ColorButton';
import { InfoButton } from '../InfoButton';
import { KofiButton } from '../KofiButton';

export const GlobalMenu = () => {
  return (
    <Box display={['block', 'block', 'none']}>
      <Menu>
        <Tooltip hasArrow label='Menu' placement='top-end'>
          <MenuButton
            aria-label='Menu'
            as={IconButton}
            icon={<FaBars />}
            variant='outline'
          />
        </Tooltip>
        <Portal>
          <MenuList minW='unset' p='0'>
            <MenuItem _focus={{ bg: 'charcoal.50' }} as='div' p='2'>
              <HStack justifyContent='center' spacing='2' w='full'>
                <ColorButton />
                <InfoButton />
                <KofiButton isMenu={true} />
              </HStack>
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </Box>
  );
};
