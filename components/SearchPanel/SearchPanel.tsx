import React from 'react';
import ReactDOM from 'react-dom';
import PopupOverlay from '../PopupOverlay/PopupOverlay';
import { SearchInputWrapper, SearchPanelContainer, SearchResultsContainer } from './SearchPanel.styles';
import { IoIosClose } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import texts from './texts';
import { useGlobalContext } from '../../context/GlobalContext';
import { BsArrowRight } from 'react-icons/bs';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { getData } from '../../utils/fetchData';
import useWindowDimensions from '../../hooks/useWindowDimensions.hook';
import LoadingSpinner from '../Loading/Loading';
import type { ISearchPanelItem } from '../SearchPanelItem/SearchPanelItem';
import SearchPanelItem from '../SearchPanelItem/SearchPanelItem';
import type { IProduct } from '../../types/Product.types';

interface ISearchPanel {
    open: boolean;
    websiteTheme: 'light theme' | 'dark theme';
    closePanel: () => void;
}

const SearchPanel = ({ open, websiteTheme, closePanel }: ISearchPanel) => {
    const [isBrowser, setIsBrowser] = React.useState<boolean>(false);
    const [closeAnimation, setCloseAnimation] = React.useState<boolean>(false);
    const [searchValue, setSearchValue] = React.useState<string>('');
    const [searchResultsOpen, setSearchResultsOpen] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [searchedProducts, setSearchedProducts] = React.useState<IProduct[]>([]);

    const { isDesktop } = useWindowDimensions();

    const { currentLanguage } = useGlobalContext();

    React.useEffect(() => {
        setIsBrowser(true);

        return () => {
            setIsBrowser(false);
            setCloseAnimation(false);
        };
    }, []);

    const handleClose = () => {
        const closeSearchPanel = () => {
            setCloseAnimation(true);
            setTimeout(() => {
                setCloseAnimation(false);
                closePanel();
            }, 400);
        };

        if (searchResultsOpen) {
            setSearchValue('');
            setSearchResultsOpen(false);
            setTimeout(closeSearchPanel, 400);
            return;
        }

        closeSearchPanel();
    };

    const handleClick = () => {
        if (searchValue.length > 0) {
            setSearchResultsOpen(true);
        }
    };

    const searchItems = async () => {
        setLoading(true);

        try {
            const res = await getData(`/search/${currentLanguage}/${searchValue}`);

            const { products } = res;

            setSearchedProducts(products);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (searchValue.length === 0) {
            setSearchedProducts([]);
            setSearchResultsOpen(false);
        }
        if (isDesktop && searchValue.length > 0) {
            setSearchResultsOpen(true);
        }
        if (searchResultsOpen && searchValue.length > 0) {
            searchItems();
        }
    }, [searchResultsOpen, searchValue]);

    const handleKeyDown = (e: React.KeyboardEvent) => (e.key === 'Enter' ? handleClick() : null);

    const handleResultTitileName: () => string | undefined = () => {
        if (searchedProducts.length === 0) {
            return texts[currentLanguage].results;
        }
        if (searchedProducts.length === 1) {
            return texts[currentLanguage].result;
        }

        if (searchedProducts.length > 1 && searchItems.length < 5) {
            if (currentLanguage === 'PL') {
                return texts[currentLanguage].results24;
            }
            return texts[currentLanguage].results;
        }
        if (searchedProducts.length >= 5) {
            return texts[currentLanguage].results;
        }
    };

    if (isBrowser && open) {
        return ReactDOM.createPortal(
            <>
                <PopupOverlay websiteTheme={websiteTheme} closeAnimation={closeAnimation} onClick={handleClose} />
                <SearchPanelContainer closeAnimation={closeAnimation} resultsOpen={searchResultsOpen}>
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
                                <input
                                    value={searchValue}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={texts[currentLanguage].youarelookingfor}
                                />
                                <button onClick={handleClick}>
                                    <BsArrowRight />
                                </button>
                            </SearchInputWrapper>
                        </div>
                    </div>
                </SearchPanelContainer>
                <SearchResultsContainer open={searchResultsOpen} loading={loading}>
                    <div className="search-results__header">
                        <button
                            className="back-search-button"
                            onClick={() => {
                                setSearchResultsOpen(false);
                                setSearchValue('');
                            }}
                        >
                            <MdOutlineArrowBackIos />
                            <span>{searchValue}</span>
                        </button>
                        <button className="close-results-button" onClick={handleClose}>
                            <IoIosClose />
                        </button>
                    </div>
                    <div className="search-results__body">
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                <div className="search-results__desc">
                                    {searchedProducts.length} {handleResultTitileName()}
                                </div>
                                <ul className="search-results__items">
                                    {searchedProducts.map((item) => (
                                        <li key={item._id}>
                                            <SearchPanelItem
                                                title={item.title}
                                                categoryid={item.categoryid}
                                                img={item.images[0]}
                                                price={item.price}
                                                slug={item.slug}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </SearchResultsContainer>
            </>,
            document.getElementById('popup')!
        );
    }

    return null;
};

export default SearchPanel;
