import { useEffect, useRef, useState } from 'react';

export default function useStateThrottle<T>(initValue: T, delay: number = 500) {
    const [value, setValue] = useState(initValue);
    const [throttledValue, setThrottledValue] = useState<T>(value);

    const lastRan = useRef(Date.now());

    useEffect(() => {
        const handler = setTimeout(function () {
            if (Date.now() - lastRan.current >= delay) {
                setThrottledValue(value);
                lastRan.current = Date.now();
            }
        }, delay - (Date.now() - lastRan.current));

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return [value, throttledValue, setValue];
};