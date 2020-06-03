import serverQuery from './server-query';
import serverEdit from './server-edit';

export const query = (event, context, callback) => {
  const handler = serverQuery.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  // tell AWS lambda we do not want to wait for NodeJS event loop
  // to be empty in order to send the response
  context.callbackWaitsForEmptyEventLoop = false;

  // process the request
  return handler(event, context, callback);
};

export const edit = (event, context, callback) => {
  const handler = serverEdit.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  // tell AWS lambda we do not want to wait for NodeJS event loop
  // to be empty in order to send the response
  context.callbackWaitsForEmptyEventLoop = false;

  // process the request
  return handler(event, context, callback);
};
