import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { ApolloError } from 'apollo-client';

const AppError: React.FC<{err: ApolloError}> = ({err}) => (
  <Alert variant="danger">
    <Alert.Heading>Error</Alert.Heading>
    {err.message}
  </Alert>
);

export default AppError;
