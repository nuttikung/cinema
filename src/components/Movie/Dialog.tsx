import { useLanguage, useMovie } from '@/hooks';
import { LANGUAGES } from '@/constants';
import { Player } from 'video-react';
import Modal from '@mui/material/Modal';
import { format } from 'date-fns';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import { Movie } from '@/types';

export const Dialog = () => {
  const { language } = useLanguage();
  const { favoriteIds, setFavoriteIds, selected, setSelected } = useMovie();

  const open = Boolean(selected);

  if (!open) {
    return null;
  }

  const { title_en, title_th, tr_mp4, release_date, genre, synopsis_en, synopsis_th, id } = selected!;
  const title = language === LANGUAGES.EN ? title_en : title_th;
  const synopsis = language === LANGUAGES.EN ? synopsis_en : synopsis_th;

  const handleFavortie = (id: Movie['id']) => () => {
    if (favoriteIds.includes(id)) {
      setFavoriteIds((current) => current.filter((mov) => mov !== id));
      return;
    }
    setFavoriteIds((current) => [...current, id]);
    return;
  };

  return (
    <Modal
      open={open}
      onClose={() => setSelected(undefined)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: `calc(100vw - 30px)`, md: 840, lg: 1000 },
          maxHeight: `calc(100vh - 40px)`,
          overflowY: 'scroll',
          bgcolor: 'background.paper',
          border: 'none',
          p: 4,
        }}
      >
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography fontWeight="bold" color="warning.main" gutterBottom>
              {format(release_date, 'dd MMM yyyy')}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography gutterBottom>{genre}</Typography>
          </Box>
          <Box>
            <ToggleButton
              sx={{
                border: 'none',
                borderRadius: '50%',
                backgroundColor: 'white !important',
              }}
              size="large"
              color="primary"
              value="check"
              selected={favoriteIds.includes(id)}
              onChange={handleFavortie(id)}
            >
              <FavoriteIcon />
            </ToggleButton>
          </Box>
        </Box>
        <Box sx={{ my: 2 }}>
          {tr_mp4 !== '' && (
            <Player>
              <source src={tr_mp4!} />
            </Player>
          )}
        </Box>
        <Typography paragraph gutterBottom>
          {synopsis}
        </Typography>
      </Box>
    </Modal>
  );
};
