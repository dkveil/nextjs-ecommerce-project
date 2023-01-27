import React from 'react'
import { media } from '../styles/theme';

interface IWindowSize {
    width: number;
    height: number
}

const useWindowDimensions = () => {
    const [windowSize, setWindowSize] = React.useState<IWindowSize>({width: 0, height: 0})

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    React.useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    },[])

    return {
        windowSize,
        isDesktop: windowSize.width >= media.desktop,
    };
}

export default useWindowDimensions;