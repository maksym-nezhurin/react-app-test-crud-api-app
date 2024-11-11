import { SubmitHandler, useForm } from "react-hook-form";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button.tsx";
import AxiosWrapper from "../../utils/fetchWrapper.tsx";
import { useCard } from "../../contexts/CardProvider.tsx";

const API_URL = `${import.meta.env.VITE_API_URL}/api/forms/checkout`;

const schema = z.object({
    amount: z.number().min(10, "Minimum amount is $10").optional(),
});

interface IData {
    paymentMethodId: string;
    amount: number; // Ensures it matches the schema
}

interface IResponse {
    clientSecret: string;
}

const CheckoutForm = () => {
    const { card } = useCard();
    const apiService = new AxiosWrapper({ baseURL: API_URL });
    const stripe = useStripe();
    const elements = useElements();

    const { register, handleSubmit, formState: { errors } } = useForm<IData>({
        resolver: zodResolver(schema),
        defaultValues: {
            amount: card.total || 0, // Ensure default value is a number
        },
    });

    const onSubmit: SubmitHandler<IData> = async (data) => {
        if (!stripe || !elements) {
            console.error("Stripe.js has not loaded yet.");
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            console.error("CardElement not found");
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.error("Error creating payment method:", error);
            return;
        }

        try {
            const { data: data2} = await apiService.post<IResponse>("/create-payment-intent", {
                paymentMethodId: paymentMethod.id,
                amount: data.amount,
            });

            const { clientSecret } = data2;

            if (clientSecret) {
                const result = await stripe.confirmCardPayment(clientSecret);
                if (result.error) {
                    console.error("Payment failed:", result.error.message);
                } else if (result.paymentIntent?.status === "succeeded") {
                    console.log("Payment succeeded:", result.paymentIntent);
                }
            } else {
                throw new Error("Payment failed: No client secret returned.");
            }
        } catch (error) {
            console.error("Payment processing error:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Card Details
                </label>
                <div className="p-2 bg-gray-100 rounded">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": { color: "#aab7c4" },
                                },
                                invalid: { color: "#9e2146" },
                            },
                        }}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Amount
                </label>
                <input
                    type="number"
                    {...register("amount", { valueAsNumber: true })} // Parse value as number
                    className={`input ${errors.amount ? "is-invalid" : ""}`}
                    placeholder="Enter amount"
                />
                {errors.amount && (
                    <p className="text-red-500 text-xs italic">
                        {errors.amount.message}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={!stripe}>
                Pay
            </Button>
        </form>
    );
};

export default CheckoutForm;
