import { useState } from "react";
import useAsyncDebouncedEffect from "./useAsyncDebouncedEffect";

export default function useAsyncDebounceCall<T>(initValue: T, callBack: (v: T) => void | Promise<void>, delay: number = 500) {
    const [value, setValue] = useState(initValue);
    useAsyncDebouncedEffect(async () => {
        await callBack(value);
    }, [value], delay);
    return [value, setValue];
}