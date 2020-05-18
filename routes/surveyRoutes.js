const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url'); // Node-native url helper library
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = (app) => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id }) // find surveys created by the particular user by ID and exclude the recipients property
            .select({ recipients: false });

        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice'); // Path object is setting up a pattern of characters that we want to look for on the pathname. p is now an object that allows us to work with the pathname we extracted from the url to get the ID and choice
       
       _.chain(req.body) 
        .map(({ email, url }) => {
        // p.test lets us check if the pathname matches the pattern we setup with the new Path instance. new URL().pathname instance takes entire event url into URL object and selects only the pathname i.e. /api/surveys/:surveyid/:choice
            const match = p.test(new URL(url).pathname); 
            if (match) {
                return { email, surveyId: match.surveyId, choice: match.choice } 
            }
        })
        .compact() // remove undefined records
        .uniqBy('email', 'surveyId') // remove duplicate records with same email AND survey ID
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: { email: email, responded: false } // Find Survey by ID, email, and if they have not yet responded
                }
            }, { // Choice will fill dynamically to 'yes' or 'no' and then is incremented by 1. Responded is then set to 'true'
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true},
                lastResponded: new Date()
            }).exec();
        })
        .value(); 

        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        // Can do ES6 single-line assignment since property name matches name of data received
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => { return {  email }}),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // Send email here
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();
        
        res.send(user); // send back updated user model with updated number of credits

        } catch(err) {
            res.status(422).send(err);
        }

    });
};