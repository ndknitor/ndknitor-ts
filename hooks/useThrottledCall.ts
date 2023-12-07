import { useState } from "react";
import useThrottledEffect from "./useThrottledEffect";

export default function useThrottledCall<T>(initValue: T, callBack: (v: T) => void, delay: number = 500) {
    const [value, setValue] = useState(initValue);
    useThrottledEffect(() => {
        callBack(value);
    }, [value], delay);
    return [value, setValue];
}