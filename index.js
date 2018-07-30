const {PORT} = require('./config/config');

const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');


require('./db/mongoose');
require('./services/passport');

const { User } = require('./db/models/user');

const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Require routes
require('./routes/auth.routes')(app);

app.listen(PORT, () => {
  console.log(`Started listening to port ${PORT}.`);
});
