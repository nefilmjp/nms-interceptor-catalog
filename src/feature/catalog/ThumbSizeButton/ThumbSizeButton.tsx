import {
  Box,
  Button,
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
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
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
          <Tooltip hasArrow label='Change thumbnail size'>
            <Box display='inline-block'>
              <PopoverTrigger>
                <IconButton
                  aria-label='Change thumbnail size'
                  icon={<MdPhotoSizeSelectLarge />}
                />
              </PopoverTrigger>
            </Box>
          </Tooltip>
          <Portal>
            <PopoverContent borderColor='blue.800'>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Choose thumbnail size.</PopoverHeader>
              <PopoverBody paddingInline='8'>
                <Slider
                  defaultValue={3}
                  max={4}
                  mb='6'
                  min={0}
                  mt='2'
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
                  {Object.entries(THUMB_SIZES).map(([value, params], index) => (
                    <SliderMark
                      fontSize='xs'
                      key={`image-size-${value}`}
                      mt='5'
                      transform='translateX(-50%)'
                      value={index}
                    >
                      {params.label}
                    </SliderMark>
                  ))}
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={6} />
                </Slider>
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
