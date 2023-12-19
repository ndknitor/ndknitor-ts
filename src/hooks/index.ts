import { DependencyList, useCallback, useEffect, useRef, useState } from "react";

export function useAsyncEffect(effect: (isMounted: () => boolean) => unknown | Promise<unknown>, deps: DependencyList) {
    useEffect(function () {
        var result;
        var mounted = true;
        var maybePromise = effect(function () {
            return mounted;
        });

        Promise.resolve(maybePromise).then(function (value) {
            result = value;
        });

        return function () {
            mounted = false;
        };
    }, deps);
}

export function useToggle(defaultValue?: boolean) {
    const [value, setValue] = useState(!!defaultValue)
    const toggle = useCallback(() => setValue(x => !x), []);
    return [value, toggle];
}

export function useDebouncedEffect(effect: () => void | Promise<void> | (() => void) | (() => Promise<void>), deps: DependencyList, delay: number = 500) {
    useAsyncEffect(() => {
        const handler = setTimeout(async () => await effect(), delay);
        return () => clearTimeout(handler);
    }, [...(deps || []), delay]);
}

export function useDebounceCall<T>(initValue: T, callBack: (v: T) => void | Promise<void>, delay: number = 500) {
    const [value, setValue] = useState(initValue);
    useDebouncedEffect(async () => {
        await callBack(value);
    }, [value], delay);
    return [value, setValue];
}

export function useThrottledEffect(effect: () => void | Promise<void> | (() => void) | (() => Promise<void>), deps: DependencyList, delay: number = 500) {
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

export function useThrottledCall<T>(initValue: T, callBack: (v: T) => void | Promise<void>, delay: number = 500) {
    const [value, setValue] = useState(initValue);
    useThrottledEffect(async () => {
        await callBack(value);
    }, [value], delay);
    return [value, setValue];
}