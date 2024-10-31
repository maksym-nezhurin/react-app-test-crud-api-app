import { useEffect, useState } from 'react';

// Custom hook to listen for localStorage item updates
function useStorageUpdate(key: string) {
    const [value, setValue] = useState<string | null>(() => {
        // Get the initial value from localStorage
        return localStorage.getItem(key);
    });

    useEffect(() => {
        const handleCustomEvent = () => {
            const updatedValue = localStorage.getItem(key);
            setValue(updatedValue);  // Update state with the new value
        };

        // Listen for the custom event
        window.addEventListener('localStorageUpdate', handleCustomEvent);

        // Cleanup
        return () => {
            window.removeEventListener('localStorageUpdate', handleCustomEvent);
        };
    }, [key]);

    return value;
}

export default useStorageUpdate;