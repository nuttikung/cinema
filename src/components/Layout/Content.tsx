import Box from '@mui/material/Box';
import { FC, PropsWithChildren, useMemo } from 'react';

import { NAV, HEADER, SPACING } from '@/constants';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const Content: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));

  const sx = useMemo(
    () => ({
      flexGrow: 1,
      minHeight: 1,
      display: 'flex',
      flexDirection: 'column',
      py: !matches ? `${HEADER.H_MOBILE + SPACING}px` : `${HEADER.H_DESKTOP + SPACING}px`,
      ...(matches && {
        ml: `${NAV.WIDTH + SPACING}px`,
        px: 2,
        width: `calc(100% - ${NAV.WIDTH + SPACING}px)`,
      }),
    }),
    [matches]
  );

  return (
    <Box component="main" sx={sx}>
      {children}
    </Box>
  );
};
