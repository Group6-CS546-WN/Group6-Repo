import businessesRoutes from './businesses.js';
import reviewsRoutes from './reviews.js';
import usersRoutes from './users.js';
import projectsRoutes from './projects.js';
import TipsGuidesRoutes from './TipsGuides.js';
import forumRoutes from './forum.js';
import productsRoutes from './products.js';
import productReviewsRoutes from './productReviews.js';
import calculatorRoutes from './calculator.js';
import { authGuard } from '../middleware.js';


import path from 'path';
import {static as staticDir} from 'express';
import { createUsers, getUserByUsername } from '../data/users.js';

const constructorMethod = (app) => {
  app.get('/', (req, res) => {
    if (req.session && req.session.user) {
      res.render('home');
    } else {
      res.sendFile(path.resolve('static/about.html'));
    }
  });
  
  app.get('/login', (req, res) => {
    req.session.destroy();
    res.render('login');
  });

  app.post('/login', async (req, res) => {
    delete req.session.user;
    const {username, password} = req.body;

    const user = await getUserByUsername(username);
      if(user && user.password == password) {
        req.session.user = user;
        return res.redirect('/profile');
      }
      res.render('login'), {error: 'Invalid username or password'};
  });
  app.get('/profile', authGuard, (req, res) => {
    if (req.session && req.session.user) {
      res.render('profile', { user: req.session.user });  // Render the profile view
    } else {
      res.redirect('/login');
    }
  });
  app.get('/register', (req, res) => {
    req.session.destroy();
    res.render('register');
  });

  app.post('/register', async (req, res) => {
    delete req.session.user;
    const errors = {};
    const {
      firstNameInput: firstName, lastNameInput: lastName,
      emailAddressInput: email,
      usernameInput: username, passwordInput: password, confirmPasswordInput: confirmPassword,
      ageInput: age, carbonFootprintInput: carbonFootprint
    } = req.body;

    if(!(confirmPassword == password)) {
      res.render('register', {errors:{
        confirmPassword: 'passwords must match'
      }});
    }

    const registrationDetails = { 
      firstName, lastName, email,
      username, password,
      age, carbonFootprint
    }

    const user = await getUserByUsername(username);
      if(!user) {
        const user = await createUsers(registrationDetails);
        if(user) {
          req.session.user = user;
          res.redirect('/');
        }
      }
      res.render('login', {errors});
  });




  app.use('/businesses', businessesRoutes);
  app.use('/reviews', reviewsRoutes);
  app.use('/users', usersRoutes);
  app.use('/projects', projectsRoutes);
  app.use('/TipsGuides', TipsGuidesRoutes);
  app.use('/forum', forumRoutes);
  app.use('/products', productsRoutes);
  app.use('/productReviews', productReviewsRoutes);
  app.use('/calculator', calculatorRoutes);
  app.get('/about', (req, res) => {
    res.sendFile(path.resolve('static/about.html'));
  });

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });


};

export default constructorMethod;