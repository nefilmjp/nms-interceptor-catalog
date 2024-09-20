import {
  Box,
  Button,
  Icon,
  IconButton,
  // Image,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Tooltip,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
// import NextLink from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';

export const InfoButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip hasArrow label='About this app'>
        <IconButton
          aria-label='About'
          icon={<FaCircleInfo />}
          onClick={onOpen}
        />
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
        // scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid row='1' spacing='4'>
              <Box>
                <Text>
                  All interceptors have been discovered solely by the project
                  author, without the use of any mods or external tools.
                </Text>
              </Box>
              <Box>
                <UnorderedList spacing={3}>
                  <ListItem>
                    <Text as='span' fontWeight='bold'>
                      Coordinates are not included.
                    </Text>{' '}
                    There is only one type of interceptor per system, so you can
                    use Carrier AI fragments to pick the class/SCS until you are
                    satisfied.
                  </ListItem>
                  <ListItem>
                    Prior to the Worlds Part I Update (Ver 5.0), the primary
                    color black was displayed as a dark purple. Screenshots from
                    Seasons 1 and 2, as well as part of Season 3, feature this
                    dark purple color.
                  </ListItem>
                  <ListItem>
                    If you are unsure how the parts of the interceptor fit
                    together,{' '}
                    <Link
                      color='blue.400'
                      href='https://hackmd.io/@Nefilm/nms-interceptor-parts-guide'
                      isExternal={true}
                    >
                      Interceptor Parts Specifications
                      <Icon
                        as={FaExternalLinkAlt}
                        h='0.8em'
                        ml='0.2em'
                        mr='0.2em'
                        verticalAlign='baseline'
                        w='0.8em'
                      />
                    </Link>{' '}
                    may be helpful.
                  </ListItem>
                  <ListItem>
                    Increasing the total number is a priority for this project.
                    For the sake of efficiency, some specifications are omitted
                    or may have reduced accuracy.
                  </ListItem>
                  <ListItem>
                    All systems with listed interceptors were discovered by the
                    project author. You can verify them in-game.
                  </ListItem>
                  {/* <ListItem>
                    All ships in this catalog were found in vanilla game
                    (Win/Steam) by the project author. You can verify the
                    discoverer of the systems.
                  </ListItem> */}
                  <ListItem>
                    All ships were found through clean gameplay — no
                    duplication, no mods, and no tool assistance. Safe to use
                    even if you play in a strictly clean environment.
                  </ListItem>
                  {/* <ListItem>
                    Currently, this project is personally run.
                  </ListItem> */}
                  <ListItem>
                    A small number of portal addresses (less than 1%) are
                    private, as this project began as a way to find unique
                    interceptors to award as event prizes.
                  </ListItem>
                  <ListItem>
                    Some settings and favorites are saved per browser.
                  </ListItem>
                </UnorderedList>
              </Box>
              <Box>
                <Text>Author</Text>
                <Text ml='4' mt='1'>
                  Nefilm (
                  <Link
                    color='blue.400'
                    href='https://x.com/nefilm_rc'
                    isExternal={true}
                  >
                    @nefilm_rc
                    <Icon
                      as={FaExternalLinkAlt}
                      h='0.8em'
                      ml='0.2em'
                      mr='0.2em'
                      verticalAlign='baseline'
                      w='0.8em'
                    />
                  </Link>
                  )
                </Text>
              </Box>
              <Box>
                <Text>Contributing</Text>
                <Text ml='4' mt='1'>
                  Reports, requests, and PRs are accepted on{' '}
                  <Link
                    color='blue.400'
                    href='https://github.com/nefilmjp/nms-interceptor-catalog'
                    isExternal={true}
                  >
                    GitHub
                    <Icon
                      as={FaExternalLinkAlt}
                      h='0.8em'
                      ml='0.2em'
                      mr='0.2em'
                      verticalAlign='baseline'
                      w='0.8em'
                    />
                  </Link>
                </Text>
              </Box>
              {/* <Box>
                <Link
                  as={NextLink}
                  display='block'
                  href='https://ko-fi.com/D1D7N4R45'
                  isExternal={true}
                  mt='4'
                >
                  <Image
                    alt='Buy Me a Coffee at ko-fi.com'
                    ml='auto'
                    mr='auto'
                    src='https://storage.ko-fi.com/cdn/kofi1.png?v=3'
                  />
                </Link>
              </Box> */}
              <Text>© Nefilm</Text>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant='outline'>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
