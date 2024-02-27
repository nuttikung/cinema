import { FC, PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Movie } from '@/types';
import axios from 'axios';

type UseMovie = {
  movies: Movie[];
  search: string;
  selected: Movie | undefined;
  loading: boolean;
  favorites: Movie[];
  favoriteIds: number[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFavoriteIds: React.Dispatch<React.SetStateAction<Movie['id'][]>>;
  setSelected: React.Dispatch<React.SetStateAction<Movie | undefined>>;
};

export const MovieContext = createContext<UseMovie | null>(null);

export const MovieProvider: FC<PropsWithChildren> = ({ children }) => {
  // TODO: refactor to dispatch.
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Movie | undefined>();

  const favoriteFromStorage = localStorage.getItem('favorite');
  const [favoriteIds, setFavoriteIds] = useState<number[]>(
    favoriteFromStorage === null ? [] : JSON.parse(favoriteFromStorage).favorite
  );
  // COMMENT: Memo because it is not primitive for reference we need memo while doing expressive.
  const favorites = useMemo(() => {
    return movies
      .filter((movie) => favoriteIds.includes(movie.id))
      .filter(
        (movie) =>
          movie.title_en.toLowerCase().includes(search.toLowerCase()) ||
          movie.title_th.toLowerCase().includes(search.toLowerCase())
      );
  }, [movies, favoriteIds, search]);

  // COMMENT: Temporary sync to local-storage.
  useEffect(() => {
    localStorage.setItem('favorite', JSON.stringify({ favorite: favoriteIds }));
  }, [favoriteIds]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);
    const fetchMovie = async () => {
      try {
        const { status, data } = await axios.get<{ movies: Movie[] }>(
          // TODO: using env instead of hard code.
          `https://www.majorcineplex.com/apis/get_movie_avaiable`,
          { cancelToken: source.token }
        );
        if (status === 200) {
          const { movies } = data;
          setMovies(movies);
          setLoading(false);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error(error);
        }
        setMovies([]);
        setLoading(false);
      }
    };
    fetchMovie();

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <MovieContext.Provider
      value={{ movies, search, loading, favorites, favoriteIds, selected, setSelected, setSearch, setFavoriteIds }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = (): UseMovie => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error('useMovie must be used inside the MovieProvider');
  }

  return context;
};
