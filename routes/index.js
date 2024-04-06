// This file will import both route files and export the constructor method as shown in the lecture code

/*
    - When the route is /products use the routes defined in the products.js routing file
    - When the route is /reviews use the routes defined in reviews.js routing file
    - All other enpoints should respond with a 404 as shown in the lecture code
*/

import businessesRoutes from './businesses.js';
import reviewsRoutes from './reviews.js';
import usersRoutes from './users.js';
import projectsRoutes from './projects.js';
import TipsGuidesRoutes from './TipsGuides.js';
import forumRoutes from './forum.js';
import productsRoutes from './products.js';
import productReviewsRoutes from './productReviews.js';

const constructorMethod = (app) => {
  app.use('/businesses', businessesRoutes);
  app.use('/reviews', reviewsRoutes);
  app.use('/users', usersRoutes);
  app.use('/projects', projectsRoutes);
  app.use('/TipsGuides', TipsGuidesRoutes);
  app.use('/forum', forumRoutes);
  app.use('/products', productsRoutes);
  app.use('/productReviews', productReviewsRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;
