import {SubmitHandler, useForm} from 'react-hook-form';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "../ui/button.tsx";
import AxiosWrapper from "../../utils/fetchWrapper.tsx";

// Define your environment variable in your .env file and ensure Vite is configured to expose it
const API_URL = `${import.meta.env.VITE_API_URL}/api/payments`;

// Validation schema
const schema = z.object({
    amount: z.number().min(10, "Minimum amount is $10").optional(),
});
interface IResponse {
    clientSecret: string;
}

interface IData {
    paymentMethodId: string;
    amount: string;
}


const CheckoutForm = () => {
    const apiService = new AxiosWrapper({ baseURL: API_URL });
    const stripe = useStripe();
    const elements = useElements();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            amount: 10,
        }
    });

    const onSubmit: SubmitHandler<IData> = async (data: IData) => {
        console.log('Form submit data:', data);
        if (!stripe || !elements) {
            console.error("Stripe.js has not loaded yet.");
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('Error creating payment method:', error);
            return;
        }

        try {
            const response  = await apiService.post<IResponse>(`${API_URL}/create-payment-intent`, {
                paymentMethodId: paymentMethod.id,
                amount: data.amount,
            });
            console.log()
            const { clientSecret } = response.data;

            if (clientSecret) {
                const result = await stripe.confirmCardPayment(clientSecret);
                if (result.error) {
                    console.error('Payment failed:', result.error.message);
                } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded:', result.paymentIntent);
                }
            } else {
                throw new Error("Payment failed: No client secret returned.");
            }
        } catch (error) {
            console.error('Payment processing error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Card Details</label>
                <div className="p-2 bg-gray-100 rounded">
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                            },
                            invalid: { color: '#9e2146' },
                        },
                    }} />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                <input
                    type="number"
                    {...register("amount")}
                    className={`input ${errors.amount ? 'is-invalid' : ''}`}
                    placeholder="Enter amount"
                />
                {errors.amount && <p className="text-red-500 text-xs italic">{errors.amount.message}</p>}
            </div>
            <Button type="submit" disabled={!stripe}>Pay</Button>
        </form>
    );
};

export default CheckoutForm;
