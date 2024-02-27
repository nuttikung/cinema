import { FC, PropsWithChildren, createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

export type User = {
  name: string;
  favorites: string[];
};

export type Authenticate = {
  initial: boolean;
  user: User | undefined;
};

enum AuthenticateDispatch {
  START_INITIALISE = 'START_INITIALISE',
  FINISH_INITIALISE = 'FINISH_INITIALISE',
  UPDATE_USER = 'UPDATE_USER',
}

type StartInitialise = {
  type: AuthenticateDispatch.START_INITIALISE;
};

type FinishInitialise = {
  type: AuthenticateDispatch.FINISH_INITIALISE;
  payload: Authenticate['user'];
};

type UpdateUser = {
  type: AuthenticateDispatch.UPDATE_USER;
  payload: Authenticate['user'];
};

export type AuthenticateAction = StartInitialise | FinishInitialise | UpdateUser;

export const INITIAL_FORM_STATE = {
  initial: false,
  user: undefined,
};

const reducer = (state: Authenticate, action: AuthenticateAction): Authenticate => {
  switch (action.type) {
    case AuthenticateDispatch.START_INITIALISE:
      return { ...state, initial: false };
    case AuthenticateDispatch.FINISH_INITIALISE:
      return { ...state, initial: true, user: action.payload };
    case AuthenticateDispatch.UPDATE_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

type UseAuthenticate = {
  state: Authenticate;
  updateCurrentUser: (user: Authenticate['user']) => void;
};

export const AuthenticateContext = createContext<UseAuthenticate | null>(null);

export const AuthenticateProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, INITIAL_FORM_STATE);

  const updateCurrentUser = (user: Authenticate['user']) => {
    dispatch({ type: AuthenticateDispatch.UPDATE_USER, payload: user });
  };
  // TODO: add effect to run init application
  useEffect(() => {
    const initialApplication = () => {
      dispatch({ type: AuthenticateDispatch.START_INITIALISE });
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch({ type: AuthenticateDispatch.FINISH_INITIALISE, payload: undefined });
        navigate('/login', { replace: true });
        return;
      }
      // TODO: Call api to check token still valid, suppose if we have token mean login for now.
      dispatch({ type: AuthenticateDispatch.FINISH_INITIALISE, payload: { name: 'John Doe', favorites: [] } });
    };
    initialApplication();
    // return () => {
    //   to clean-up axios when implement real authenticate;
    // };
  }, []);

  return (
    <AuthenticateContext.Provider
      value={{
        state,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthenticateContext.Provider>
  );
};

export const useAuthenticate = (): UseAuthenticate => {
  const context = useContext(AuthenticateContext);

  if (!context) {
    throw new Error('useAuthenticate must be used inside the AuthenticateProvider');
  }

  return context;
};
