import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { AccountPopover, LanguagePopover, SearchBar } from '@/components/Layout';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { grey } from '@/theme';
import { NAV, HEADER } from '@/constants';

export const Header = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));

  const handleOpenNav = () => {};

  return (
    <>
      <AppBar
        sx={{
          boxShadow: 'none',
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 1,
          backdropFilter: `blur(6px)`,
          WebkitBackdropFilter: `blur(6px)`,
          backgroundColor: alpha(grey[500], 0),
          color: theme.palette.background.default,
          transition: theme.transitions.create(['height'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(matches && {
            width: `calc(100% - ${NAV.WIDTH + 1}px)`,
            height: HEADER.H_DESKTOP,
          }),
        }}
      >
        <Toolbar
          sx={{
            height: 1,
            px: { lg: 5 },
          }}
        >
          {!matches && (
            <IconButton onClick={handleOpenNav} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" alignItems="center" spacing={1}>
            <LanguagePopover />
            <AccountPopover />
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};
