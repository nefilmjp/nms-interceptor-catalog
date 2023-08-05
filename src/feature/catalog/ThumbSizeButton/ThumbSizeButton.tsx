import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Switch,
  Tooltip,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { MdPhotoSizeSelectLarge } from 'react-icons/md';

import { THUMB_SIZES } from '@/config';
import { CatalogContext } from '@/store/CatalogContext';

export const ThumbSizeButton = () => {
  const { settings, setSettings } = useContext(CatalogContext);

  return (
    <Popover computePositionOnMount={true}>
      {({ onClose }) => (
        <>
          <Tooltip hasArrow label='Thumbnail settings'>
            <Box display='inline-block'>
              <PopoverTrigger>
                <IconButton
                  aria-label='Thumbnail settings'
                  icon={<MdPhotoSizeSelectLarge />}
                />
              </PopoverTrigger>
            </Box>
          </Tooltip>
          <Portal>
            <PopoverContent borderColor='blue.800'>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Thumbnail settings</PopoverHeader>
              <PopoverBody>
                <SimpleGrid row='1' spacing='4'>
                  <Box h='14' mt='2' paddingInline='6'>
                    <Slider
                      defaultValue={3}
                      max={4}
                      min={0}
                      step={1}
                      onChange={(value) => {
                        setSettings({
                          ...settings,
                          thumbSize: Object.keys(THUMB_SIZES)[
                            value
                          ] as keyof typeof THUMB_SIZES,
                        });
                      }}
                      value={Object.keys(THUMB_SIZES).findIndex(
                        (letter) => settings.thumbSize === letter,
                      )}
                    >
                      {Object.entries(THUMB_SIZES).map(
                        ([value, params], index) => (
                          <SliderMark
                            fontSize='xs'
                            key={`image-size-${value}`}
                            mt='5'
                            transform='translateX(-50%)'
                            value={index}
                          >
                            {params.label}
                          </SliderMark>
                        ),
                      )}
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb boxSize={6} />
                    </Slider>
                  </Box>
                  <FormControl alignItems='center' display='flex'>
                    <Switch
                      id='only-favorites'
                      isChecked={settings.rearView ? true : false}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          rearView: !settings.rearView,
                        })
                      }
                    />
                    <FormLabel htmlFor='only-favorites' mb='0' ml='4'>
                      Rear view (If available)
                    </FormLabel>
                  </FormControl>
                </SimpleGrid>
              </PopoverBody>
              <PopoverFooter>
                <Button onClick={onClose} variant='outline'>
                  Close
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
};
