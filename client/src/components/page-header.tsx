import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

interface PageHeaderProps {
  link?: string;
  children: any;
}

const PageHeader: React.FC<PageHeaderProps> = ({ link = '', children }) => {

  const title = <h1>{children}</h1>
  return link !== '' ? (<LinkContainer to={link}><a href="#make-ts-happy">{title}</a></ LinkContainer>) : title;
};

export default PageHeader;
