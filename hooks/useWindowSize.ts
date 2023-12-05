import { useState } from "react"
import useEventListener from "./useEventListener"
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect"

export default function useWindowSize() {
    const [height, setHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);

    const handleSize = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    }
    useEventListener('resize', handleSize)
    useIsomorphicLayoutEffect(() => {
        handleSize()
    }, [])

    return [height, width];
}
