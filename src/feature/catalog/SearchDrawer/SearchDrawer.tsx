import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  SimpleGrid,
  Portal,
  Divider,
  Tooltip,
  Text,
} from '@chakra-ui/react';
import LZstring from 'lz-string';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useUpdateEffect } from 'react-use';

import { CatalogContext } from '@/store/CatalogContext';
import { CommonContext } from '@/store/CommonContext';
import { execQuery } from '@/utils/execQuery';

import { BodyFinder } from '../BodyFinder';
import { BottomFinder } from '../BottomFinder';
import { ColorFinder } from '../ColorFinder';
import { FavoritesToggle } from '../FavoritesToggle/FavoritesToggle';
import { HeadFinder } from '../HeadFinder';
import { PrivateToggle } from '../PrivateToggle';
import { SkirtFinder } from '../SkirtFinder';
import { TopFinder } from '../TopFinder';

export const SearchDrawer = () => {
  const { coll, settings, parts } = useContext(CommonContext);
  const { items, setItems, intQuery, setIntQuery, mutate } =
    useContext(CatalogContext);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const isInit = useRef<boolean>(true);

  // Restore from params
  useEffect(
    () => {
      if (!coll) {
        setItems([]);
        return;
      }
      if (isInit.current) {
        isInit.current = false;
        const serializedQuery = searchParams.get('q');
        if (serializedQuery) {
          const param =
            LZstring.decompressFromEncodedURIComponent(serializedQuery);
          const json = JSON.parse(param);
          setItems(execQuery(coll, json, settings));
          setIntQuery(json);
          return;
        }
      }
      setItems(execQuery(coll, {}, settings));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [coll],
  );

  useUpdateEffect(() => {
    const serializedQuery = LZstring.compressToEncodedURIComponent(
      JSON.stringify(intQuery),
    );
    const params = new URLSearchParams(searchParams.toString());
    if (Object.keys(intQuery).length === 0) params.delete('q');
    else params.set('q', serializedQuery);
    router.push(pathname + '?' + params.toString());
    mutate();
  }, [intQuery, settings.showPrivate, settings.onlyFavorites]);

  return (
    <>
      <Tooltip hasArrow label='Search'>
        <IconButton
          aria-label='Search'
          icon={<FaSearch />}
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
          size='md'
        >
          <DrawerOverlay backgroundColor='transparent' />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              Search
              <Text as='span' fontSize='md' fontWeight='unset' ml='2'>
                ({items.length} results found)
              </Text>
            </DrawerHeader>

            <DrawerBody>
              <SimpleGrid columns={1} spacing={4}>
                <ColorFinder
                  intQuery={intQuery}
                  label='Primary color'
                  parts={parts}
                  propName='primaryColor'
                  setIntQuery={setIntQuery}
                />
                <ColorFinder
                  intQuery={intQuery}
                  label='Secondary color'
                  parts={parts}
                  propName='secondaryColor'
                  setIntQuery={setIntQuery}
                />
                <HeadFinder
                  intQuery={intQuery}
                  parts={parts}
                  setIntQuery={setIntQuery}
                />
                <BodyFinder
                  intQuery={intQuery}
                  parts={parts}
                  setIntQuery={setIntQuery}
                />
                <TopFinder
                  intQuery={intQuery}
                  parts={parts}
                  setIntQuery={setIntQuery}
                />
                <BottomFinder
                  intQuery={intQuery}
                  parts={parts}
                  setIntQuery={setIntQuery}
                />
                <SkirtFinder
                  intQuery={intQuery}
                  parts={parts}
                  setIntQuery={setIntQuery}
                />
                <Divider />
                <FavoritesToggle />
                <PrivateToggle />
              </SimpleGrid>
            </DrawerBody>

            <DrawerFooter>
              <Button mr={3} onClick={onClose} variant='outline'>
                Close
              </Button>
              <Button
                isDisabled={Object.keys(intQuery).length === 0}
                mr={3}
                variant='outline'
                onClick={() => {
                  setItems(execQuery(coll, {}, settings)); // mutate with empty query
                  setIntQuery({});
                }}
              >
                Reset
              </Button>
              {/* <Button
                colorScheme='blue'
                onClick={() => {
                  const serializedQuery =
                    LZstring.compressToEncodedURIComponent(
                      JSON.stringify(intQuery),
                    );
                  const params = new URLSearchParams(searchParams.toString());
                  params.set('q', serializedQuery);
                  router.push(pathname + '?' + params.toString());
                  mutate();
                }}
              >
                Apply
              </Button> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Portal>
    </>
  );
};
