import { useEffect, useState } from "react";

export default function useStateDebounce<T>(initValue: T, delay?: number) {
    const [value, setValue] = useState<T>(initValue);
    const [debouncedValue, setDebouncedValue] = useState<T>(initValue);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return [value, debouncedValue, setValue];
}
