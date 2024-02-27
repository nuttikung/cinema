import { useAuthenticate } from '@/hooks';
import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectRoute: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useAuthenticate();
  const isAuthen = !!state.user;
  return isAuthen ? children : <Navigate to="/login" replace />;
};
