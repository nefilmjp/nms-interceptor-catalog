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
                <UnorderedList>
                  <ListItem>
                    <Text as='span' fontWeight='bold'>
                      Coordinates are not included.
                    </Text>{' '}
                    There is only one type of interceptor for each system, so
                    you can use Carrier AI fragments to pick class/SCS until you
                    are satisfied.
                  </ListItem>
                  <ListItem>
                    Increasing the total number is a priority in this project.
                    For the sake of efficiency, some specifications are omitted
                    (or have less accuracy).
                  </ListItem>
                  <ListItem>
                    All ships in this catalog were found in vanilla game
                    (Win/Steam) by the project author. You can verify the
                    discoverer of the systems.
                  </ListItem>
                  <ListItem>
                    All ships were found while playing cleanly. Not duped, not
                    modded, and not tool-assisted. Safe to use even if you play
                    in a strictly clean.
                  </ListItem>
                  <ListItem>
                    Currently, this project is personally run.
                  </ListItem>
                  <ListItem>
                    This project started to find unique interceptors as prizes
                    for events, so a few percent of the portal addresses are
                    private.
                  </ListItem>
                  <ListItem>
                    Some settings and favorites are saved per browser.
                  </ListItem>
                </UnorderedList>
              </Box>
              <Box>
                <Text>Parts specifications</Text>
                <Text ml='4' mt='1'>
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
                  </Link>
                </Text>
              </Box>
              <Box>
                <Text>Author</Text>
                <Text ml='4' mt='1'>
                  Nefilm (
                  <Link
                    color='blue.400'
                    href='https://twitter.com/nefilm_rc'
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
