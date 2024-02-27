import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

export function NavList<T>({ items, render }: { items: T[]; render: (item: T, index: number) => ReactNode }) {
  return (
    <Stack component="nav" spacing={0.5} sx={{ px: 2, mt: 2 }}>
      {items.map((item, index) => render(item, index))}
    </Stack>
  );
}
