const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('../config/config');
const { User } = require('../db/models/user');


passport.serializeUser((user, done) => {
  console.log(user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (user) {
    done(null, user);
  } else {
    throw new Error(`Could not find user`);
  }
});

passport.use(
  new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, async (accessToken, refreshToken, profile, done) => {
    // console.log('access token', accessToken);
    // console.log('refresh token', refreshToken);
    console.log('profile:', profile);

    let user = await User.findOne({
      googleId: profile.id
    });

    if (user) {
      done(null, user);
    } else {
      user = new User({
        googleId: profile.id
      });
      try {
        await user.save();
        done(null, user);
      } catch (e) {
        console.log(e);
        done(e);
      }
    }

  }));
