import { useMovie } from '@/hooks';
import { MovieList, MovieCard, Dialog } from '@/components';
import { useMemo } from 'react';

export const Search = () => {
  const { movies, search, loading } = useMovie();

  const list = useMemo(() => {
    return movies.filter(
      (movie) =>
        movie.title_en.toLowerCase().includes(search.toLowerCase()) ||
        movie.title_th.toLowerCase().includes(search.toLowerCase())
    );
  }, [movies, search]);

  if (loading) {
    return <div>Loading Component or skeleton</div>;
  }

  return (
    <>
      <Dialog />
      <MovieList items={list} render={(item) => <MovieCard key={item.title_th} {...item} />} />
    </>
  );
};
