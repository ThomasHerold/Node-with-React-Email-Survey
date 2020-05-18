const express = require('express');
const mongoose =  require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); // This order matters! Need to load the user model before loading the passport service
require('./models/Survey');
require('./services/passport'); // don't need to set equal to a variable because the passport file is not returning anything, we only need it to execute at least once

mongoose.connect(keys.mongoURI);
const app = express();

// Back-End Middleware
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // Length of active cookie time (in milliseconds) 
        keys: [keys.cookieKey]            // Encrypted cookie key; Can have many keys. Picks randomly if multiple keys
    })
);

// tell passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes/authRoutes')(app); // require statement returns a function, and then we immediately invoking it with the app variable
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets like our main.js, css file
    app.use(express.static('client/build'));

    // Express will serve up the index.html file if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000; // if environment variable has not been provided by Heroku, then assign to 5000
app.listen(PORT);

