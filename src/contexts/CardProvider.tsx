// @ts-nocheck

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { IProduct } from "../types";
import { generateUUID } from "../utils/strings.ts";
import StorageWrapper from "../utils/storageWrapper.ts";

interface CardContextType {
    products: ICardProduct[],
    total: number,
    orderId: string
}

export type ICardProduct = Pick<IProduct, '_id' | 'name' | 'description' | 'price' | 'image'> & {
    quantity: number;
};

interface ContentContextType {
    card: CardContextType;
    addProduct: (product: ICardProduct) => void;
    removeProduct: (id: string) => void;
    orderId: string
}

const CardContext = createContext<ContentContextType | undefined>(undefined);

const storage = new StorageWrapper();
export const CardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [card, setCard] = useState<CardContextType>({
        products: [],
        total: 0,
        orderId: generateUUID() // Move generation to initial state to avoid changing ID on every render
    });

    const addProduct = (product: ICardProduct) => {
        console.log('product', product)
        setCard(previousCard => {
            const productIndex = previousCard.products.findIndex(p => p._id === product._id);
            let newProducts = [...previousCard.products];

            if (productIndex !== -1) {
                newProducts[productIndex] = {
                    ...newProducts[productIndex],
                    quantity: newProducts[productIndex].quantity + 1
                };
            } else {
                newProducts.push({ ...product, quantity: 1 });
            }

            const newTotal = newProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

            return {
                ...previousCard,
                products: newProducts,
                total: newTotal
            };
        });
    };

    useEffect(() => {
        storage.setItem('card', JSON.stringify(card));
        console.log('card', card);
    }, [card]);

    const removeProduct = (id: string) => {
        setCard(previousCard => {
            const newProducts = previousCard.products.reduce((acc, product) => {
                if (product._id === id) {
                    if (product.quantity > 1) {
                        // Decrease quantity if more than one
                        acc.push({ ...product, quantity: product.quantity - 1 });
                    }
                    // If quantity is 1, do not push it back to array (essentially removing it)
                } else {
                    // Keep all other products as is
                    acc.push(product);
                }
                return acc;
            }, []);

            const newTotal = newProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);

            return {
                ...previousCard,
                products: newProducts,
                total: newTotal
            };
        });
    };

    return (
        <CardContext.Provider value={{ card, addProduct, removeProduct, orderId: card.orderId }}>
            {children}
        </CardContext.Provider>
    );
};

export const useCard = (): ContentContextType => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error('useCard must be used within a CardProvider');
    }
    return context;
};
