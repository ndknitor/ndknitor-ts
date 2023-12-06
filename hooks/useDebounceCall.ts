import { useState } from "react";
import useDebouncedEffect from "./useDebouncedEffect";

export default function useDebounceCall<T>(initValue: T, callBack: (v: T) => void | Promise<void>, delay: number = 500) {
    const [value, setValue] = useState(initValue);
    useDebouncedEffect(() => {
        callBack(value);
    }, [value], delay);
    return [value, setValue];
}