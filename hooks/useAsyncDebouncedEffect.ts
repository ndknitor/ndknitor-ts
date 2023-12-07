import { DependencyList } from "react";
import useAsyncEffect from "./useAsyncEffect";

export default function useAsyncDebouncedEffect(effect: () => void | Promise<void> | (() => void) | (() => Promise<void>), deps: DependencyList, delay: number = 500) {
    useAsyncEffect(() => {
        const handler = setTimeout(async () => await effect(), delay);
        return () => clearTimeout(handler);
    }, [...(deps || []), delay]);
}