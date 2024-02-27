import { forwardRef } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

type LinkProps = {
  href: string;
};

export const Link = forwardRef<any, Omit<RouterLinkProps, 'to'> & LinkProps>(({ href, ...rest }, ref) => (
  <RouterLink ref={ref} to={href} {...rest} />
));
