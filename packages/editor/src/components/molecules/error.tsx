import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ApolloError } from 'apollo-client';

const AppError: React.FC<{ err: ApolloError }> = ({ err }) => (
  <Alert severity="error" variant="filled">
    <AlertTitle>Error</AlertTitle>
    {err.message}
  </Alert>
);

export default AppError;
