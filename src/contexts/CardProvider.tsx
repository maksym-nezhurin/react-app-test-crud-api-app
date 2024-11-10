import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import { IProduct } from "../types";
import {generateUUID} from "../utils/strings.ts";
import StorageWrapper from "../utils/storageWrapper.ts";

interface CardContextType {
    products: IProduct[],
    total: number,
    orderId: string
}

interface ContentContextType {
    card: CardContextType;
    addProduct: (products: IProduct[]) => void;
    removeProduct: (id: string) => void;
    orderId: string
}

const CardContext = createContext<ContentContextType | undefined>(undefined);

const storage = new StorageWrapper();
export const CardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [card, addCard] = useState<CardContextType>(JSON.parse(storage.getItem('card') || ''));

    const orderId = generateUUID();
    const addProduct = (products: IProduct[]) => {
        addCard(previousCard => {
            const newProducts = [...previousCard.products, ...products]

            return {
                ...previousCard,
                products: newProducts,
                total: newProducts.reduce((acc, product) => {
                    console.log(acc, product.price)
                    return acc + product.price;
                }, 0),
                orderId: previousCard.total === 0 && generateUUID()
            }
        });
    };

    useEffect(() => {
        storage.setItem('card', JSON.stringify(card));
    }, [card]);

    const removeProduct = (id: string) => {
        // @ts-ignore
        addCard((previousCard) => {
            const filteredProducts = previousCard.products.map(product => {
                return {
                    ...product,
                    isDeleted: product.isDeleted || product._id === id
                }
            });
            return {
                products: filteredProducts,
                total: filteredProducts.reduce((acc, product) => {
                    if (!product.isDeleted) {
                        return acc + product.price
                    }
                    return acc;
                }, 0)
            };
        });
    };

    return (
        <CardContext.Provider value={{ card, addProduct, removeProduct, orderId }}>
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
