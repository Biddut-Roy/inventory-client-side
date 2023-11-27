import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutFrom from "./CheckOutFrom";


const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY_PK)
    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutFrom />
                </Elements>
            </div>
        </div>

    );
};

export default Payment;