import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";




const CheckOutFrom = () => {
    const [error, setError] = useState('')
    const { user } = useAuth()
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe()
    const elements = useElements()
    const [transactionId, setTransactionId] = useState('')
    const SecureAxios = useAxiosSecure()
    const navigate = useNavigate()
    const { money } = useParams();
    useEffect(() => {
        if (money > 0) {
            SecureAxios.post('/create-payment-intent', { price: money })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [SecureAxios, money])

    const income = parseInt(money)
    let limit = 0;
    if (income === 10) {
        limit = 200;
    } else if (income === 20) {
        limit = 450;
    } else {
        limit = 1500;
    }

    const handleSubmit = async (event) => {
        // Block native form submission
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log(" payment error");
        }
        else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                const payment = {
                    limit,
                    email: user?.email,
                    price: income,
                    date: new Date(), 
                    Admin: "juniortricky.devloper@gmail.com"
                }
                console.log(payment.menuItemIds);

                SecureAxios.post('/payment-update', payment)
                    .then(res => {
                        if (res.data?.result?.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Thank you for the taka paisa",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/dashboards')
                        }
                    })


            }
        }
    }



    return (

        <div className=" w-11/12  md:w-10/12 lg:w-1/2 mx-auto bg-white mt-10 p-2 md:p-10">
            <form onSubmit={handleSubmit} >
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className=" text-center">
                    <button className="  mt-5 btn btn-primary btn-sm bg-blue-600" type="submit" disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
                </div>
                <div className=" text-orange-500 text-center">
                    {error}
                    <h2 className=" text-cyan-500">transaction id : {transactionId}</h2>
                </div>
            </form>
        </div>

    );
};

export default CheckOutFrom;