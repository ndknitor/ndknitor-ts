import { useEffect, useState } from 'react';

export default function useStateThrottle<T>(initValue: T, delay: number) {
    const [value, setValue] = useState(initValue);
    const [throttledValue, setThrottledValue] = useState<T>(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setThrottledValue(value);
        }, delay);
        return () => clearTimeout(timeoutId);
    }, [value, delay]);

    return [value, throttledValue, setValue];
};