import { Box, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { useContext } from 'react';

import { CommonContext } from '@/store/CommonContext';

export const FavoritesToggle = () => {
  const { settings, setSettings } = useContext(CommonContext);

  return (
    <Box>
      <FormControl alignItems='center' display='flex'>
        <Switch
          id='only-favorites'
          isChecked={settings.onlyFavorites ? true : false}
          onChange={() =>
            setSettings({ ...settings, onlyFavorites: !settings.onlyFavorites })
          }
        />
        <FormLabel htmlFor='only-favorites' mb='0' ml='4'>
          Only favorites
        </FormLabel>
      </FormControl>
    </Box>
  );
};
