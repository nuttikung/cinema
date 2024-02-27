import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { NavItem, NavList } from '@/components/Layout';
import { NAV, MENU_OPTIONS } from '@/constants';

export const Navbar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));

  const renderNavbar = (
    <NavList
      items={MENU_OPTIONS}
      render={(menu) => <NavItem key={menu.label} icon={menu.icon} to={menu.to} label={menu.label} />}
    />
  );

  return (
    <Box sx={{ flexShrink: { lg: 0 }, width: { lg: NAV.WIDTH } }}>
      {matches ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderNavbar}
        </Box>
      ) : (
        <Drawer open={false} onClose={() => {}} PaperProps={{ sx: { width: NAV.WIDTH } }}>
          {renderNavbar}
        </Drawer>
      )}
    </Box>
  );
};
