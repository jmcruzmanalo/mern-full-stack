const passport = require('passport');
const { User } = require('../db/models/user');


module.exports = (app) => {

  app.get(`/test`, async (req, res) => {
    const user = await User.findOne({
      googleId: '111830467083076773053'
    });
    res.send({
      'test': 'test'
    });
  })

  app.get(`/auth/google`, passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/surveys');
  });

  app.get(`/api/logout`, (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/me', (req, res) => {
    // res.send(req.session)
    res.send(req.user);
  });

};
