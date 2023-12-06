import { useEffect, DependencyList } from 'react';

type AsyncEffectCallback = () => Promise<void>;

export default function useAsyncEffect(asyncEffect: AsyncEffectCallback, dependencies: DependencyList) {
    useEffect(() => {
        const effectPromise = asyncEffect();

        return () => {
            if (effectPromise && typeof effectPromise.then === 'function') {
                effectPromise.then(() => { }).catch(() => { }); 
            }
        };
    }, dependencies);
};