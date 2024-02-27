import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { MENU_OPTIONS } from '@/constants';
import { useAuthenticate, useMovie } from '@/hooks';
import { Link } from '@/components';

export const AccountPopover = () => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const { state, updateCurrentUser } = useAuthenticate();
  const { setFavoriteIds, setSearch } = useMovie();
  const navigate = useNavigate();

  const name = state.user?.name ?? '';

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    updateCurrentUser(undefined);
    setFavoriteIds([]);
    setSearch('');
    navigate('/login', { replace: true });
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(Boolean(open) && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={name}
          alt={name}
          sx={{ width: 36, height: 36, border: (theme) => `solid 2px ${theme.palette.background.default}` }}
        >
          {name.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { p: 0, mt: 1, ml: 0.75, width: 200 } } }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} component={Link} href={option.to}>
            <Box display="flex" alignItems="center">
              <Box display="flex" mr={1}>
                {option.icon}
              </Box>
              {option.label}
            </Box>
          </MenuItem>
        ))}
        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />
        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
};
