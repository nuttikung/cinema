import { useAuthenticate, useMovie } from '@/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormEvent, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

export type LoginForm = {
  username: string;
  password: string;
};

const INITIAL_FORM_STATE: LoginForm = {
  username: '',
  password: '',
};

enum LoginDispatch {
  VALUE_CHANGE = 'VALUE_CHANGE',
}

type FormValueChange = {
  type: LoginDispatch.VALUE_CHANGE;
  field: keyof LoginForm;
  payload: string;
};

type LoginAction = FormValueChange;

const reducer = (state: LoginForm, action: LoginAction): LoginForm => {
  switch (action.type) {
    case LoginDispatch.VALUE_CHANGE:
      return { ...state, [action.field]: action.payload };
    default:
      return state;
  }
};

export const Login = () => {
  const navigate = useNavigate();
  const { updateCurrentUser } = useAuthenticate();
  const [state, dispatch] = useReducer(reducer, INITIAL_FORM_STATE);

  const handleChange = (field: FormValueChange['field']) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: LoginDispatch.VALUE_CHANGE, field, payload: event.target.value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (state.username !== '' && state.password !== '') {
      // COMMENT: Fake call login then set token, missing loading when button is clicked.
      localStorage.setItem('token', 'example token');
      localStorage.setItem('favorite', JSON.stringify({ favorite: [] }));
      updateCurrentUser({ name: 'John Doe', favorites: [] });
      navigate('/', { replace: true });
    }
  };

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: 1, minHeight: '100vh', m: 2 }}>
      <Paper sx={{ padding: 3 }}>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            id="outlined-username"
            label="Username"
            variant="outlined"
            type="text"
            autoComplete="username"
            margin="dense"
            value={state.username}
            onChange={handleChange('username')}
            fullWidth
          />
          <TextField
            id="outlined-password"
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            margin="dense"
            value={state.password}
            onChange={handleChange('password')}
            fullWidth
          />
          <Button sx={{ mt: 1 }} variant="contained" type="submit" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
};
