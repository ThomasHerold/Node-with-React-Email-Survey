const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose; // equivalent to above. Mongoose has property called schema, so take that property and assign to Schema

const userSchema = new Schema({
    googleId: String,
    facebookId: String,
    credits: { 
        type: Number,
        default: 0 
    }
});

mongoose.model('users', userSchema); // first param is the name of the new collection
