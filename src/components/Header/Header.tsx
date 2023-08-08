import { HStack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { GlobalMenu } from '../GlobalMenu';
import { InfoButton } from '../InfoButton';
import { KofiButton } from '../KofiButton';
import { SettingsButton } from '../SettingsButton';

interface HeaderProps {
  children?: ReactNode;
}

export function Header(props: HeaderProps) {
  const { children } = props;

  return (
    <HStack
      as='header'
      bg='chakra-body-bg'
      left='0'
      p='2'
      paddingLeft='4'
      position='fixed'
      right='0'
      top='0'
    >
      <Text
        className='ff-geo'
        fontSize={['sm', '3dvw', '2xl']}
        fontWeight='bold'
        mr='auto'
      >
        <Text as='span'>No Man&#39;s Sky </Text>
        <Text as='span' whiteSpace='nowrap'>
          Interceptor Catalog
        </Text>
      </Text>
      {children}
      <HStack display={['none', 'none', 'flex']}>
        <SettingsButton />
        <InfoButton />
        <KofiButton />
      </HStack>
      <GlobalMenu />
    </HStack>
  );
}
