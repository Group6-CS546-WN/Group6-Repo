import businessRoutes from './businesses.js';
import userRoutes from './users.js';
import path from 'path';
import {static as staticDir} from 'express';
const constructorMethod = (app) => {
  app.use('/businesses', businessRoutes);
  app.use('/users', userRoutes);
  app.get('/about', (req, res) => {
    res.sendFile(path.resolve('static/about.html'));
  });
  app.use('/public', staticDir('public'));
  app.use('*', (req, res) => {
    res.redirect('/businesses');
  });
};

export default constructorMethod;