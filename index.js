const {PORT, COOKIE_KEY} = require('./config/config');



const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');


require('./db/mongoose');
require('./services/passport');

const { User } = require('./db/models/user');

const app = express();
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Require routes
require('./routes/auth.routes')(app);
require('./routes/billing.routes')(app);

app.listen(PORT, () => {
  console.log(`Started listening to port ${PORT}.`);
});
