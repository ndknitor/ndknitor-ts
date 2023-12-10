import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export default function useEffectOnce(effect: EffectCallback, deps: DependencyList) {
    const call = useRef(false);
    useEffect(() => {
        if (!call.current) {
            call.current = true;
            return effect();
        }
    }, []);
}