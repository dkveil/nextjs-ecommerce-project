import React from 'react';
import { HeroContainer, HeroVideo } from './Hero.styles';
import { useGlobalContext } from '../../context/GlobalContext';
import texts from './texts';
import Link from 'next/link';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const heroVideosList = [
    '/videos/hero-video1.mp4',
    '/videos/hero-video2.mp4',
    '/videos/hero-video3.mp4',
    '/videos/hero-video4.mp4',
    '/videos/hero-video5.mp4',
];

const Hero = () => {
    const { currentLanguage, websiteTheme } = useGlobalContext();
    const [currentHeroVideo, setCurrentHeroVideo] = React.useState<number>(Math.round(Math.random() * (heroVideosList.length - 1) + 1));
    const [mountedHeroVideos, setMountedHeroVideos] = React.useState<number[]>([]);
    const [showButtons, setShowButtons] = React.useState<boolean>(false);

    const handleMountedVideos = () => {
        setMountedHeroVideos(
            currentHeroVideo === 1
                ? [heroVideosList.length, 1, 2]
                : currentHeroVideo === heroVideosList.length
                ? [heroVideosList.length - 1, heroVideosList.length, 1]
                : [currentHeroVideo - 1, currentHeroVideo, currentHeroVideo + 1]
        );
    };

    React.useEffect(() => {
        handleMountedVideos();
    }, []);

    React.useEffect(() => {
        handleMountedVideos();
    }, [currentHeroVideo]);

    React.useEffect(() => {
        const changeHeroVideoTimeout = setTimeout(() => {
            setCurrentHeroVideo((prev) => (prev === heroVideosList.length ? 1 : prev + 1));
        }, 8000);

        return () => clearTimeout(changeHeroVideoTimeout);
    }, [currentHeroVideo]);

    return (
        <HeroContainer
            showButtons={showButtons}
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
            websiteTheme={websiteTheme}
        >
            <div className="container">
                <div className="inner-hero">
                    <div className="hero-content">
                        <h1 className="hero-heading">{texts[currentLanguage].heading}</h1>
                        <p className="hero-paragraph">{texts[currentLanguage].paragraph}</p>
                        <Link href="/products" className="hero-link-button">
                            {texts[currentLanguage].button}
                        </Link>
                    </div>
                </div>
            </div>
            <button
                className="hero-button left"
                onClick={() => setCurrentHeroVideo((prev) => (prev === 1 ? heroVideosList.length : prev - 1))}
            >
                <IoIosArrowBack />
            </button>
            <button
                className="hero-button right"
                onClick={() => setCurrentHeroVideo((prev) => (prev === heroVideosList.length ? 1 : prev + 1))}
            >
                <IoIosArrowForward />
            </button>
            <div className="hero-videos-wrapper">
                {heroVideosList.map((herovideo, index) => {
                    if (mountedHeroVideos.find((currentIndex) => currentIndex === index + 1)) {
                        return (
                            <HeroVideo
                                key={herovideo}
                                id={herovideo}
                                className="hero-video"
                                src={herovideo}
                                position={mountedHeroVideos.findIndex((currentIndex) => currentIndex === index + 1) - 2}
                                autoPlay
                                loop
                                muted
                            />
                        );
                    }

                    return null;
                })}
            </div>
        </HeroContainer>
    );
};

export default Hero;
