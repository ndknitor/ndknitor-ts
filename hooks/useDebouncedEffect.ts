import { DependencyList , EffectCallback, useEffect} from "react";

export default function useDebouncedEffect(effect : EffectCallback, deps : DependencyList, delay : number | 500)
{
    useEffect(() => {
        const handler = setTimeout(() => effect(), delay);
        return () => clearTimeout(handler);
    }, [...(deps || []), delay]);
}