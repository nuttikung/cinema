import { Route, Routes } from 'react-router-dom';
import { Favorite, Login, Search } from '@/pages';
import { useAuthenticate } from '@/hooks';
import { Layout, ProtectRoute } from '@/components';

export const App = () => {
  const { state } = useAuthenticate();

  if (!state.initial) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectRoute>
            <Layout />
          </ProtectRoute>
        }
      >
        <Route index element={<Search />} />
        <Route path="/:id" element={<div>detail Page</div>} />
        <Route path="favorite" element={<Favorite />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
