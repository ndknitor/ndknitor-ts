import { DependencyList, Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

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
    return [value, toggle] as [boolean, () => void];
}

export function useDebouncedEffect(effect: () => void | Promise<void> | (() => void) | (() => Promise<void>), deps?: DependencyList, delay: number = 750) {
    useEffect(() => {
        const handler = setTimeout(async () => await effect(), delay);
        return () => clearTimeout(handler);
    }, [...(deps || []), delay]);
}

export function useDebounceCall<T>(initValue: T, callBack: (v: T) => void | Promise<void>, delay: number = 750) {
    const [value, setValue] = useState(initValue);
    useDebouncedEffect(async () => {
        await callBack(value);
    }, [value], delay);
    return [value, setValue] as [T, Dispatch<SetStateAction<T>>];
}

export function useDebounceState<T>(initValue?: T, delay: number = 750) {
    const [value, setValue] = useState(initValue);
    const [dValue, setDValue] = useState(initValue);

    useEffect(() => {
        const timeoutId = setTimeout(() => setDValue(value), delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);

    return [value, dValue, setValue] as [T, T, Dispatch<SetStateAction<T>>];
}

export function useThrottledEffect(effect: () => void | Promise<void> | (() => void) | (() => Promise<void>), deps?: DependencyList, delay: number = 2000) {
    const lastRan = useRef(Date.now());
    useEffect(() => {
        const handler = setTimeout(async function () {
            if (Date.now() - lastRan.current >= delay) {
                lastRan.current = Date.now();
                return await effect();
            }
        }, delay - (Date.now() - lastRan.current));

        return () => {
            clearTimeout(handler);
        };
    },
        [delay, ...deps || []],
    );
}

export function useThrottledState<T>(initValue: T, delay: number = 2000) {
    const lastRan = useRef(Date.now());
    const [value, setValue] = useState(initValue);
    const [tValue, setTValue] = useState(initValue);
    useEffect(() => {
        const handler = setTimeout(async function () {
            if (Date.now() - lastRan.current >= delay) {
                setTValue(value);
                lastRan.current = Date.now();
            }
        }, delay - (Date.now() - lastRan.current));

        return () => {
            clearTimeout(handler);
        };
    }, [value, tValue, setTValue]);

    return [value, tValue, setValue] as [T, T, Dispatch<SetStateAction<T>>];
}

export function useThrottledCall<T>(initValue: T, callBack: (v: T) => void | Promise<void>, delay: number = 2000) {
    const [value, setValue] = useState(initValue);
    useThrottledEffect(async () => {
        await callBack(value);
    }, [value], delay);
    return [value, setValue] as [T, Dispatch<SetStateAction<T>>];
}

export function useInitEffect(effect: () => void | Promise<void> | (() => void) | (() => Promise<void>)) {
    const inited = useRef(false);
    useAsyncEffect(async () => {
        if (!inited.current) {
            inited.current = true;
            return await effect();
        }
    }, [inited]);
}