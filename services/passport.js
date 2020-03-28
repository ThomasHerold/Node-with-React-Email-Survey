const passport = require('passport');
const keys = require('../config/keys');
const mongoose =  require('mongoose');
const GoogleStrategy =  require('passport-google-oauth20').Strategy; // adds specific property called Strategy

const User = mongoose.model('users'); //  one arg means we only want to fetch users

// Direct passport to use the specific strategy so it behaves the way we like. Inner function creates new instance of the Google strategy
passport.use(
    new GoogleStrategy({ // internally defines strategy string called 'google'
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback' // user is redirected here after user grants permission for app to send request to google for their info
      }, 
      (accessToken, refreshToken, profile, done) => { 
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if(existingUser)  {
                    done(null, existingUser);
                 } else {
                    new User({ googleId: profile.id })
                        .save()     // takes profile id record and saves to the db
                        .then((user) => done(null, user)); 
                 }     
            });
      })
  ); 