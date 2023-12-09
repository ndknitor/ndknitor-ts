import { useState } from "react";
import useAsyncThrottledEffect from "./useAsyncThrottledEffect";

export default function useAsyncThrottledCall<T>(initValue: T, callBack: (v: T) => void | Promise<void>, delay: number = 500) {
    const [value, setValue] = useState(initValue);
    useAsyncThrottledEffect(async () => {
        await callBack(value);
    }, [value, callBack], delay);
    return [value, setValue];
}