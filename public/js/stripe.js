/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51MFDLPKTHmK4XI01qucnjjQTNCMKz3QPorIOTImaU253bGbVEvXRc5GSL3ckOpnSzQuW3yfUCXyQ5qF8vLrppmmp00tw7vI0mL'
    );
    console.log(stripe);
    // 1.) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );

    console.log(session);
    // 2.) Create checkout form + chance credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
