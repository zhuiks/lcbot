const serverQuery = require('./server-query');
const serverEdit = require('./server-edit');

module.exports.query = (event, context, callback) => {
  const handler = serverQuery.createHandler({
    cors: {
      origin: true,
      credentials: true,
    },
  });

  // tell AWS lambda we do not want to wait for NodeJS event loop
  // to be empty in order to send the response
  context.callbackWaitsForEmptyEventLoop = false;

  // process the request
  return handler(event, context, callback);
};

module.exports.edit = (event, context, callback) => {
  const handler = serverEdit.createHandler({
    cors: {
      origin: true,
      credentials: true,
    },
  });

  // tell AWS lambda we do not want to wait for NodeJS event loop
  // to be empty in order to send the response
  context.callbackWaitsForEmptyEventLoop = false;

  // process the request
  return handler(event, context, callback);
};
