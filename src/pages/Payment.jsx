import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Navigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Pj1uvHNFkBAHeQmUr2iYQsFaqncwr3khQrL5tXMAEFjqAN2W90KrsO2vUTp00cvg6ABgRKHwRQVLdVpCoR6vCxN00sUBgBfPT"
);

const Payment = ({ cookie }) => {
  const location = useLocation();

  if (!cookie) {
    return <Navigate to="/login" />;
  }
  if (!location.state) {
    return <Navigate to="/" />;
  }

  const { product_name, product_price } = location.state.offerDetails;

  const getPrice = (price) => {
    const subTotal = Math.round((price + 1.2) * 100);
    const total = (subTotal / 100).toFixed(2);
    return total;
  };
  return (
    <main className="container">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: getPrice(product_price) * 100,
          currency: "eur",
        }}
      >
        <CheckoutForm
          productName={product_name}
          amount={getPrice(product_price)}
          productPrice={product_price}
          getPrice={getPrice}
        />
      </Elements>
    </main>
  );
};

export default Payment;
