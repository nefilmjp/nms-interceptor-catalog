import { Box, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { useContext } from 'react';

import { CommonContext } from '@/store/CommonContext';

export const PrivateToggle = () => {
  const { settings, setSettings } = useContext(CommonContext);

  return (
    <Box>
      <FormControl alignItems='center' display='flex'>
        <Switch
          id='show-private'
          isChecked={settings.showPrivate ? true : false}
          onChange={() =>
            setSettings({ ...settings, showPrivate: !settings.showPrivate })
          }
        />
        <FormLabel htmlFor='show-private' mb='0' ml='4'>
          Show private
        </FormLabel>
      </FormControl>
    </Box>
  );
};
