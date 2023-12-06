import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export default function useThrottledEffect(effect: EffectCallback, deps: DependencyList, delay: number = 500) {
    const lastRan = useRef(Date.now());
    useEffect(
        () => {
            const handler = setTimeout(function () {
                if (Date.now() - lastRan.current >= delay) {
                    effect();
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