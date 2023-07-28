import { Container, Spinner } from '@chakra-ui/react';

export const LoadingSpinner = () => {
  return (
    <main>
      <Container
        alignItems='center'
        display='flex'
        h='100dvh'
        justifyContent='center'
        minW='full'
      >
        <Spinner size='xl' speed='0.65s' thickness='4px' />
      </Container>
    </main>
  );
};
