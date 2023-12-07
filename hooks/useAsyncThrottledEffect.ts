import { DependencyList, EffectCallback, useEffect, useRef } from "react";
import useAsyncEffect from "./useAsyncEffect";

export default function useAsyncThrottledEffect(effect: () => void | Promise<void> | (() => void) | (() => Promise<void>), deps: DependencyList, delay: number = 500) {
    const lastRan = useRef(Date.now());
    useAsyncEffect(() => {
        const handler = setTimeout(async function () {
            if (Date.now() - lastRan.current >= delay) {
                await effect();
                lastRan.current = Date.now();
            }
        }, delay - (Date.now() - lastRan.current));

        return () => {
            clearTimeout(handler);
        };
    },
        [delay, ...deps],
    );
}