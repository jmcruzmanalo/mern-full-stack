

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const requireLogin = require('../middlewares/requireLogin');


module.exports = (app) => {

  app.post(`/billing/stripe`, requireLogin, async (req, res) => {

    try {
      const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id
      });
    } catch (e) {
      console.log(e);
      throw new Error(`/billing/stripe - failed to create stripe charge - ${e}`);
    }
    
    try {
      req.user.credits += 5;
      await req.user.save();
      res.send(req.user);
      return;
    } catch (e) {
      console.log(e);
      throw new Error(`/billing/stripe - failed to save user - ${e}`);
    }
  });

};
