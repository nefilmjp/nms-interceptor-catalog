import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { useMemo } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const tooltipLabel = useMemo(
    () =>
      colorMode === 'light' ? 'Change to dark mode' : 'Change to light mode',
    [colorMode],
  );

  return (
    <Tooltip hasArrow label={tooltipLabel}>
      <IconButton
        aria-label='Switch dark/light mode'
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
};
