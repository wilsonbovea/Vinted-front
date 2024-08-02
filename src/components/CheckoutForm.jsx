import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

import axios from "axios";

const CheckoutForm = ({ productName, amount, productPrice, getPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const amountFixed = (amount * 100).toFixed(0);
  console.log(amountFixed);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (elements == null) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Affiche l'erreur en question
      setErrorMessage(submitError.message);
      return;
    }
    try {
      const response = await axios.post(
        "https://site--vinted-backend--7pddggdgmnqf.code.run/payment",
        {
          title: productName,
          amount: amountFixed,
        }
      );

      const stripeResponse = await stripe.confirmPayment({
        // elements contient les infos et la configuration du paiement
        elements,
        clientSecret: response.data.client_secret,
        confirmParams: {
          return_url: "https://vinted-by-wilson.netlify.app/",
        },

        // redirect: "if_required",
      });
      if (stripeResponse.error) {
        setErrorMessage(stripeResponse.error.message);
      }
      if (stripeResponse.paymentIntent.status === "succeeded") {
        setCompleted(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  return completed ? (
    <p>Félicitations pour votre acquisition ! Paiement effectué !</p>
  ) : (
    <main>
      <section className="payment container">
        <div className="payment-details">
          <h2>Commande :</h2>
          <span>{productPrice.toFixed(2)} €</span>
        </div>
        <div className="payment-details">
          <h2>Frais protection acheteur :</h2>
          <span>0.40 €</span>
        </div>
        <div className="payment-details">
          <h2>Frais de port :</h2>
          <span>0.80 €</span>
        </div>
        <div className="payment-details">
          <h2>TOTAL :</h2>
          <span>{getPrice(productPrice)} €</span>
        </div>

        <form onSubmit={handleSubmit} className="pay-form">
          <PaymentElement className="payment-element" />
          <button disabled={!stripe || !elements || isLoading}>Pay</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </section>
    </main>
  );
};

export default CheckoutForm;
