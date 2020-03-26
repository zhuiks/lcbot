import React from 'react';
import { Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';


interface PageHeaderProps {
  link?: string;
  children: any;
}

const PageHeader: React.FC<PageHeaderProps> = ({ link = '', children }) => (
  <Typography variant="h3" component="h1">
    {link !== '' ? (
      <Link component={RouterLink} to={link}>{children}</Link>
    ) : (
      <>{children}</>
    )}
  </Typography>
);


export default PageHeader;
