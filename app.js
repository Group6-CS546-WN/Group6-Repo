import express from 'express';
import session from 'express-session';
import exphbs from 'express-handlebars';
import configRoutes from './routes/index.js';

const app = express();

// Set up handlebars engine with custom helpers and default layout
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number') {
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
      }
      return new Handlebars.SafeString(JSON.stringify(obj));
    },
    partialsDir: ['views/partials/']
  }
}));
app.set('view engine', 'handlebars');

// Session configuration
app.use(session({
  secret: "change me",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,  // Should be true if you're using HTTPS
    sameSite: true,
    httpOnly: true
  }
}));

// Middleware to rewrite unsupported browser methods (e.g., for PUT, DELETE over POST)
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  if (req.body && typeof req.body._method === 'string') {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
};

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);
app.use('/public', express.static('public'));  // Serving static files

// Apply configured routes
configRoutes(app);

// Server initialization
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
