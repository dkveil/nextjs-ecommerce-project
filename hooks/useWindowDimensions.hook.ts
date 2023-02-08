import React from 'react'
import { media } from '../styles/theme';

interface IWindowSize {
    width: number;
    height: number
}

const useWindowDimensions = () => {
    const [windowSize, setWindowSize] = React.useState<IWindowSize>({width: 0, height: 0})
    const [isDesktop, setIsDesktop] = React.useState<boolean>(windowSize.width >= media.desktop)

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

    React.useEffect(() => {
        setIsDesktop(windowSize.width >= media.desktop)
    }, [windowSize])

    return {
        windowSize,
        isDesktop
    };
}

export default useWindowDimensions;