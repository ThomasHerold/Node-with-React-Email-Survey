const passport = require('passport');
const keys = require('../config/keys');
const mongoose =  require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // adds specific property called Strategy
const FacebookStrategy = require('passport-facebook').Strategy;

const User = mongoose.model('users'); //  one arg means we only want to fetch users

// Create cookie (token) that is used to identify the user making follow-up requests
passport.serializeUser((user, done) => { // The 'user' referenced here is either the new user we just created or the existing user we just found from lines 21 and on
    done(null, user.id); // id here is the mongo id assigned by mongo in the db. Not to be confused with profile ID
});

// Turn token into a mongoose model instance by searching the db with the Id we assigned in serializeUser
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        });
}); 


// Direct passport to use the specific strategy so it behaves the way we like. Inner function creates new instance of the Google strategy
passport.use(
    new GoogleStrategy({ // internally defines strategy string called 'google'
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback', // user is redirected here after user grants permission for app to send request to google for their info
      proxy: true
      }, 
      async (accessToken, refreshToken, profile, done) => { 
      const existingUser = await User.findOne({ googleId: profile.id }) // mongoose query to find if user info we are getting already exists in database; returns a Promise 
             
       if(existingUser)  {
        return done(null, existingUser); // second param is "proof" that we have a user when we say we are done
        } // if no user found, create a new one and save it

         const user = await new User({ googleId: profile.id }).save()     // takes profile id record and saves to the db; save returns a promise so we can call 'done'
         done(null, user); 

     }     
 ));

// Facebook authentication strategy
passport.use(
      new FacebookStrategy({
          clientID: keys.facebookClientID,
          clientSecret: keys.facebookClientSecret,
          callbackURL: '/auth/facebook/callback',
          proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {  
      const existingUser = await User.findOne({ facebookId: profile.id })
        
        if(existingUser) {
         return done(null, existingUser);
        } 

        const user = await new User({ facebookId: profile.id }).save()
        done(null, user);
     }
));