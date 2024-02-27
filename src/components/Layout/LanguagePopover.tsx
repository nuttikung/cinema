import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useLanguage } from '@/hooks';
import { SUPPORT_LANGUAGE } from '@/constants';
import { Language } from '@/types';

export const LanguagePopover = () => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const { language, setLanguage } = useLanguage();

  const current = useMemo(() => SUPPORT_LANGUAGE.find((lang) => lang.label === language), [language]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSelectLanguage = (lang: Language) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setLanguage(lang.label);
    setOpen(null);
  };

  return (
    <>
      {!!current && (
        <IconButton onClick={handleOpen} sx={{ width: 40, height: 40 }}>
          <img src={current.icon} alt={current.label} />
        </IconButton>
      )}

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { p: 0, mt: 1, ml: 0.75, width: 180 } } }}
      >
        {SUPPORT_LANGUAGE.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.label === language}
            onClick={handleSelectLanguage(option)}
            sx={{ typography: 'body2', py: 1 }}
          >
            <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};
