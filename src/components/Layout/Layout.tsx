import { Outlet } from 'react-router-dom';
import { Content, Header, Navbar } from '@/components/Layout';
import Box from '@mui/material/Box';

export const Layout = () => {
  return (
    <>
      <Header />
      <Box sx={{ minHeight: 1, display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}></Box>
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </>
  );
};
