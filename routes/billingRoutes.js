const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecret);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.post('/api/stripe', requireLogin, async (req, res) => { // second param will check if user is authenticated first before moving onto callback and completing the handler
      const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: 'Purchased 5 credits for $5',
            source: req.body.id
        });

        // Reminder: req.user is in reference to the current logged-in user that passport assigns when we serialize that user, so we can take that user and update their model directly
        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user); // send response back to browser with updated user
    });
};