import queryRouter from './query-router';

export default (app) => {
  app.use('/query/', queryRouter);
};