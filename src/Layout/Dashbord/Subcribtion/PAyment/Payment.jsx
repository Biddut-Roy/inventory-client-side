import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutFrom from "./CheckOutFrom";
import { Helmet } from "react-helmet-async";


const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY_PK)
    return (
        <div>
            <Helmet>
                <title>IMS || Payment</title>
                <link rel="canonical" />
            </Helmet>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutFrom />
                </Elements>
            </div>
        </div>

    );
};

export default Payment;