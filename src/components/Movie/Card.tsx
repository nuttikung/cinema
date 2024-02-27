import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ToggleButton from '@mui/material/ToggleButton';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { useLanguage, useMovie } from '@/hooks';
import { Movie } from '@/types';
import { LANGUAGES } from '@/constants';
import { convertDurationHumanize } from '@/helpers';
import Box from '@mui/material/Box';

export const MovieCard = (item: Movie) => {
  const { language } = useLanguage();
  const { favoriteIds, setFavoriteIds, setSelected } = useMovie();
  const { poster_url, title_th, title_en, genre, duration, release_date } = item;

  const title = language === LANGUAGES.EN ? title_en : title_th;
  const durationHumanize = useMemo(() => convertDurationHumanize(duration, language), [duration, language]);

  const handleClickMovie = (movie: Movie) => (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    setSelected(movie);
  };

  const handleFavortie =
    ({ id }: Movie) =>
    () => {
      if (favoriteIds.includes(id)) {
        setFavoriteIds((current) => current.filter((mov) => mov !== id));
        return;
      }
      setFavoriteIds((current) => [...current, id]);
      return;
    };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardMedia
          sx={{ cursor: 'pointer' }}
          component="img"
          height={400}
          image={poster_url}
          alt={title}
          onClick={handleClickMovie(item)}
        />
        <CardContent>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography fontWeight="bold" color="warning.main">
                {format(release_date, 'dd MMM yyyy')}
              </Typography>
              <Typography fontWeight="medium" color="text.secondary">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {genre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {durationHumanize}
              </Typography>
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
                selected={favoriteIds.includes(item.id)}
                onChange={handleFavortie(item)}
              >
                <FavoriteIcon />
              </ToggleButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
