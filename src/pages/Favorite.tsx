import { MovieCard, MovieList } from '@/components';
import { useMovie } from '@/hooks';

export const Favorite = () => {
  const { favorites, loading } = useMovie();

  if (loading) {
    return <div>Loading Component or skeleton</div>;
  }

  return <MovieList items={favorites} render={(item) => <MovieCard key={item.title_th} {...item} />} />;
};
