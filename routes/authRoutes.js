const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google', // path where this method is invoked
        passport.authenticate('google', { // first arg is the strategy type string, which has been internally defined previously through the new GoogleStrategy instance
        scope: ['profile', 'email'] // telling api that we want the user's profile and email information
    }) 
    );

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google')
    ); // handles route that user is sent to after granting permission. We can now authenticate because a code is received from google 

}