import React from 'react';
import ReactDOM from 'react-dom';
import PopupOverlay from '../PopupOverlay/PopupOverlay';
import { SearchInputWrapper, SearchPanelContainer } from './SearchPanel.styles';
import { IoIosClose } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import texts from './texts';
import { useLanguageContext } from '../../context/LanguageContext';
import { BsArrowRight } from 'react-icons/bs';

interface ISearchPanel {
    open: boolean;
    websiteTheme: 'light theme' | 'dark theme';
    closePanel: () => void;
}

const SearchPanel = ({ open, websiteTheme, closePanel }: ISearchPanel) => {
    const [isBrowser, setIsBrowser] = React.useState<boolean>(false);
    const [closeAnimation, setCloseAnimation] = React.useState<boolean>(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const { currentLanguage } = useLanguageContext();

    React.useEffect(() => {
        setIsBrowser(true);

        return () => setIsBrowser(false);
    }, []);

    const handleClose = () => {
        setCloseAnimation(true);
        setTimeout(() => {
            setCloseAnimation(false);
            closePanel();
        }, 400);
    };

    const handleClick = () => {
        console.log(inputRef.current?.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => (e.key === 'Enter' ? handleClick() : null);

    if (isBrowser && open) {
        return ReactDOM.createPortal(
            <>
                <PopupOverlay websiteTheme={websiteTheme} closeAnimation={closeAnimation} onClick={handleClose} />
                <SearchPanelContainer closeAnimation={closeAnimation}>
                    <div className="container">
                        <div className="search-panel-header">
                            <span className="search-panel-info">
                                {texts[currentLanguage].search}
                                <CiSearch />
                            </span>
                            <button onClick={handleClose}>
                                <IoIosClose />
                                <span>{texts[currentLanguage].search}</span>
                            </button>
                        </div>
                        <div className="search-panel-body">
                            <SearchInputWrapper>
                                <input ref={inputRef} onKeyDown={handleKeyDown} placeholder={texts[currentLanguage].youarelookingfor} />
                                <button onClick={handleClick}>
                                    <BsArrowRight />
                                </button>
                            </SearchInputWrapper>
                        </div>
                    </div>
                </SearchPanelContainer>
            </>,
            document.getElementById('popup')!
        );
    }

    return null;
};

export default SearchPanel;
