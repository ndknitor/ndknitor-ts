import { useState } from "react";
import useDebouncedEffect from "./useDebouncedEffect";

export default function useDebounceCall<T>(initValue: T, callBack: (v: T) => void, delay: number = 500) {
    const [value, setValue] = useState(initValue);
    useDebouncedEffect(() => {
        callBack(value);
    }, [value, callBack], delay);
    return [value, setValue];
}