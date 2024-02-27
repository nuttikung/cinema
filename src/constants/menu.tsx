import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieIcon from '@mui/icons-material/Movie';
import type { Menu } from '@/types';

export const MENU_OPTIONS: Menu[] = [
  {
    label: 'Movie Finder',
    icon: <MovieIcon />,
    to: '/',
  },
  {
    label: 'My Favorite',
    icon: <FavoriteIcon />,
    to: '/favorite',
  },
];
