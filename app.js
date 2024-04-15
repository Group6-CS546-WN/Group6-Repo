// This file should set up the express server as shown in the lecture code
import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
const middleware = require('./middleware');

// Set up handlebars as the view engine
//app.engine('handlebars', handlebars());
app.engine('handlebars', handlebars.engine({defaultLayout: 'main', 
layoutsDir: __dirname + '/views/layouts/',
helpers: {
    extend: function(name, context) {
        return context.fn(this);
    },
    content: function(name, context) {
        return context.fn(this);
    }
} }));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Session middleware configuration
app.use(
  session({
      name: 'AuthState',
      secret: "This is a secret.. shhh don't tell anyone",
      saveUninitialized: false,
      resave: false,
      cookie: {maxAge: 60000}
  }));

  // Static files
app.use('/public', express.static('public'));


app.get('/', middleware.rootRedirectMiddleware, (req, res) => {
  res.send('Root Route');
});

app.get('/login', middleware.blockAuthenticatedAccess, (req, res) => {
  res.render('login');
});

app.get('/register', middleware.blockAuthenticatedAccess, (req, res) => {
  res.render('register');
});

app.get('/protected', middleware.ensureAuthenticated, (req, res) => {
  let userAdmin = req.session.user.role === 'admin' ? true : false;
  res.render('protected', { firstName: req.session.user.firstName, lastName: req.session.user.lastName, currentTime: new Date().toUTCString(), role: req.session.user.role, isAdmin: userAdmin });
});

app.get('/admin', middleware.ensureAdmin, (req, res) => {
  res.render('admin', { firstName: req.session.user.firstName, lastName: req.session.user.lastName, currentTime: new Date().toUTCString()});
});


configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

