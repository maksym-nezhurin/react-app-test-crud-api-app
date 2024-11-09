import React, {useState} from 'react';
import CheckoutForm from "../components/PaymentCard";
import {CheckoutFormInner} from "../components/Forms/Checkout";
import {Button} from "../components/ui/button.tsx";

const enum Steps {
    delivery,
    checkout
}

const BasketPage: React.FC = () => {
    const [step, setStep] = useState(Steps.delivery);
    const [orderId, setOrderId] = useState(122);

    const activateEditMode = () => {
        console.log('activateEditMode')
    }

    return (<div className={"grid h-full grid-rows-[auto_1fr_auto]"}>
        <header
            className="flex-grow bg-gray-100 rounded-xl p-3 flex items-center justify-center justify-self-center px-8 mb-2">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Checkout page</h1>
                <p className="mb-6">Please, check everything and confirm:</p>
            </div>
        </header>

        <main className="grid grid-cols-2">
            <div>
                <h2>List of selected goods and services</h2>
            </div>

            <div className="delivery-details">
                <h2>Delivery details</h2>
                <h5>Please, select date to deliver and provide your address.</h5>

                <div>
                    {
                        <>
                            <CheckoutFormInner editMode={step === Steps.delivery} orderId={orderId} onSuccess={(id) => {
                                setStep(Steps.checkout)
                                console.log('delivery details saved with id: ', id)
                            }} />

                            {
                                step === Steps.delivery && <Button onClick={activateEditMode}>Edit</Button>
                            }
                        </>
                    }
                    {
                        (step === Steps.checkout) && <>
                            <CheckoutForm />
                        </>
                    }
                </div>
            </div>
        </main>

        <footer className="bg-gray-500 text-white">
            <div className="container mx-auto text-center p-4">
                <p>Copyright © 2023 Your Company</p>
            </div>
        </footer>
    </div>)
}

export default BasketPage;