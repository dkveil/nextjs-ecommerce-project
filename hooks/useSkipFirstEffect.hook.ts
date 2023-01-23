import React from 'react'

export const useSkipFirstEffect = <T, G> (callback: () => T, dependencies: G[]) => {
    const firstRenderRef = React.useRef(true)

    React.useEffect(() => {
        if(firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        callback();
    }, [callback, ...dependencies])
}