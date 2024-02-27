import { ReactNode } from 'react';
import Grid from '@mui/material/Grid';

export function MovieList<T>({ items, render }: { items: T[]; render: (item: T, index: number) => ReactNode }) {
  return (
    <Grid sx={{ flexGrow: 1, p: 2 }} alignItems="stretch" container spacing={2}>
      {items.map((item, index) => render(item, index))}
    </Grid>
  );
}
