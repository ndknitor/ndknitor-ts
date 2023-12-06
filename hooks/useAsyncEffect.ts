import { useEffect, DependencyList } from 'react';

export default function useAsyncEffect(effect: (isMounted: () => boolean) => unknown | Promise<unknown>, deps: DependencyList) {
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