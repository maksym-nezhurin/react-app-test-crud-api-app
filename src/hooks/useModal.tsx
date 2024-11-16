import React, { createContext, useContext, useState } from 'react';

// Create context
const ModalContext = createContext({
    isModalOpen: false,
    openModal: () => {},
    closeModal: () => {},
});

// Provider component
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

// Custom hook to use modal context
export const useModal = () => useContext(ModalContext);
