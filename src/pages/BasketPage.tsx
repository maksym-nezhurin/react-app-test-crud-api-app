import React, {useState} from 'react';
import CheckoutForm from "../components/PaymentCard";
import {CheckoutFormInner} from "../components/Forms/Checkout";
import {Button} from "../components/ui/button.tsx";
import {useCard} from "../contexts/CardProvider.tsx";
import {Card, CardContent, CardFooter} from "../components/ui/card.tsx";
import { TrashIcon } from "@radix-ui/react-icons"
import {MinusCircle, PlusCircle} from "lucide-react";

const enum Steps {
    delivery,
    checkout
}

const BasketPage: React.FC = () => {
    const [step, setStep] = useState(Steps.delivery);
    const {orderId, card, addProduct, removeProduct} = useCard();
    const {products = [], total = 0} = card;

    return (<div className={"grid h-full grid-rows-[auto_1fr_auto]"}>
        <header
            className="flex-grow bg-gray-100 rounded-xl p-3 flex items-center justify-center justify-self-center px-8 mb-2">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Checkout page</h1>
                <p className="mb-6">Please, check everything and confirm:</p>
            </div>
        </header>

        <main className="grid grid-cols-2 gap-2">
            <div>
                <h2 className={'bg-gray-200 p-4 rounded-xl my-4'}>List of selected goods and services</h2>

                {
                    products.map((product) => {
                        return product._id && <Card key={product._id} className={'gap-4 border rounded-xl p-3 my-2'}>
                            <CardContent className={'flex flex-row rounded-lg overflow-hidden relative'}>
                                <div className="w-20 h-20 bg-gray-200 flex-shrink-0">
                                    {product.image ?
                                        <img src={`/${product.image}`} alt={product.name}
                                             className="w-full h-full object-cover"/> :
                                        <div className="flex items-center justify-center h-full">No image</div>}
                                </div>
                                <div className={"flex flex-col p-2 items-center w-full"}>
                                    <div>{product.name}</div>
                                    <div>{product.description}</div>
                                    <div>{product.price}</div>

                                </div>
                            </CardContent>
                            <CardFooter className={'flex justify-between'}>
                                <div>Quantity: {product.quantity}</div>

                                <div>
                                    <Button size="sm" variant="ghost" onClick={() => addProduct(product)}><PlusCircle /></Button>
                                    <Button size="sm" variant="destructive"
                                            onClick={() => removeProduct(product._id)}>{product.quantity > 1 ? <MinusCircle/> : <TrashIcon />}</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    })
                }

                <h4>Total amount is ${total}</h4>
            </div>

            <div className="delivery-details">
                <h2 className={'bg-gray-200 p-4 rounded-xl my-4'}>Delivery details</h2>
                <h5 className={'text-xs'}>Please, select date to deliver and provide your address.</h5>

                <div>
                    {
                        (step === Steps.checkout) && <>
                            <CheckoutForm/>
                        </>
                    }
                    {
                        <>
                            <CheckoutFormInner editMode={step === Steps.checkout} orderId={orderId} onSuccess={(id) => {
                                setStep(Steps.checkout)
                                console.log('delivery details saved with id: ', id)
                            }}/>
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