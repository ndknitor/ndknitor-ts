import { DependencyList } from "react";
export declare function useAsyncEffect(effect: (isMounted: () => boolean) => unknown | Promise<unknown>, deps: DependencyList): void;
export declare function useToggle(defaultValue?: boolean): (boolean | (() => void))[];
export declare function useDebouncedEffect(effect: () => void | Promise<void> | (() => void) | (() => Promise<void>), deps: DependencyList, delay?: number): void;
export declare function useDebounceCall<T>(initValue: T, callBack: (v: T) => void | Promise<void>, delay?: number): (T | import("react").Dispatch<import("react").SetStateAction<T>>)[];
export declare function useThrottledEffect(effect: () => void | Promise<void> | (() => void) | (() => Promise<void>), deps: DependencyList, delay?: number): void;
export declare function useThrottledCall<T>(initValue: T, callBack: (v: T) => void | Promise<void>, delay?: number): (T | import("react").Dispatch<import("react").SetStateAction<T>>)[];
