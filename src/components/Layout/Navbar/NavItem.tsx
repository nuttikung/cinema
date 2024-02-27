import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import { alpha } from '@mui/material/styles';
import { useMatch } from 'react-router-dom';
import { Link } from '@/components';
import { Menu } from '@/types';

export const NavItem = (item: Menu) => {
  const { label, to, icon } = item;
  const active = useMatch(to);
  return (
    <ListItemButton
      component={Link}
      href={to}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {icon}
      </Box>
      <Box component="span">{label} </Box>
    </ListItemButton>
  );
};
