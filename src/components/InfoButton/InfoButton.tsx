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
                  <ListItem>Currently unstable</ListItem>
                  <ListItem>
                    Some settings and favorites can be saved (per browser)
                  </ListItem>
                  <ListItem>
                    This project started to find unique interceptors as prizes
                    for events, so a few percent of the portal addresses are
                    private
                  </ListItem>
                </UnorderedList>
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
