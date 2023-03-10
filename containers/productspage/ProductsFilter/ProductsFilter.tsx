import React from 'react';
import { ProductsFilterButtonSection, ProductsFilterSection, FilterItem } from './ProductsFilter.styles';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useGlobalContext } from '../../../context/GlobalContext';
import texts from './texts';
import { IoIosClose } from 'react-icons/io';
import type { IFilterValues } from '../../../templates/ProductsPageTemplate';
import PopupOverlay from '../../../components/PopupOverlay/PopupOverlay';

export const clotheSizes = ['XS', 'S', 'XM', 'M', 'L', 'XL', 'XXL'];
export const shoesSizes = ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'];

interface IFilterOption {
    name: 'size' | 'price' | 'sortby';
    inputtype: string;
    options?: string[];
}

interface IProductsFilter {
    filterValues: IFilterValues;
    handleChangeFilters: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setPriceFilters: (minPrice: number, maxPrice: number) => void;
    clearFilters: (value?: 'size' | 'maxPrice' | 'minPrice' | 'sortby') => void;
    category?: string;
}

const ProductsFilter = ({ filterValues, handleChangeFilters, setPriceFilters, clearFilters, category }: IProductsFilter) => {
    const [isFiltersCartOpen, setIsFiltersCartOpen] = React.useState<boolean>(false);
    const [priceInputsError, setPriceInputsError] = React.useState<boolean>(false);
    const { currentLanguage, websiteTheme, setNotify } = useGlobalContext();
    const [activeFilterSubmenu, setActiveFilterSubmenu] = React.useState({
        size: false,
        price: false,
        sortby: false,
    });

    const filtersOptions: IFilterOption[] = [
        {
            name: 'size',
            inputtype: 'checkbox',
            options:
                category === 'shoes'
                    ? shoesSizes
                    : category === 'hoodies' || category === 'tshirts'
                    ? clotheSizes
                    : clotheSizes.concat(shoesSizes),
        },
        {
            name: 'price',
            inputtype: 'range',
        },
        {
            name: 'sortby',
            inputtype: 'radio',
            options: ['newest', 'popular', 'atoz', 'ztoa', 'pricehightolow', 'pricelowtohigh'],
        },
    ];

    const minPriceRef = React.useRef<HTMLInputElement>(null);
    const maxPriceRef = React.useRef<HTMLInputElement>(null);

    const handleCloseFiltersCart = (action?: 'clear filters' | 'set filters') => {
        if (minPriceRef.current) minPriceRef.current.value = filterValues.minPrice.toString();
        if (maxPriceRef.current) maxPriceRef.current.value = filterValues.maxPrice.toString();

        if (action === 'clear filters') {
            clearFilters();
            return;
        }

        setIsFiltersCartOpen(false);
        setActiveFilterSubmenu({
            size: false,
            price: false,
            sortby: false,
        });
    };

    const handleInputCheck = (item: string | string[], subitem: string) => {
        if (typeof item !== 'string') {
            return Boolean(item.find((item) => item === subitem));
        }

        return Boolean(item === subitem);
    };

    const handleFilterValue = (value?: string | string[], price?: boolean) => {
        if (price) {
            if (filterValues.minPrice !== 0 && filterValues.maxPrice !== 0) {
                return `${texts[currentLanguage].from} ${filterValues.minPrice} ${texts[currentLanguage].currency} - ${texts[currentLanguage].to} ${filterValues.maxPrice} ${texts[currentLanguage].currency}`;
            }
            if (filterValues.minPrice !== 0) {
                return `${texts[currentLanguage].from} ${filterValues.minPrice} ${texts[currentLanguage].currency}`;
            }
            if (filterValues.maxPrice !== 0) {
                return `${texts[currentLanguage].to} ${filterValues.maxPrice} ${texts[currentLanguage].currency}`;
            }

            return texts[currentLanguage].all;
        }

        if (typeof value !== 'string' && value) {
            if (value.length === 0) {
                return texts[currentLanguage].all;
            }
            if (value.length > 2) {
                return `${value.slice(0, 2).join(', ')} & ${value.length - 2} ${texts[currentLanguage].more}`;
            }
            return value.join(', ');
        }

        return value && texts[currentLanguage][value];
    };

    const handlePriceFilters = (minPrice: string | undefined, maxPrice: string | undefined) => {
        setPriceInputsError(false);

        if (minPrice && maxPrice) {
            if (Number.isNaN(minPrice) || Number.isNaN(maxPrice)) {
                setNotify(texts[currentLanguage].invalidformat);
                return;
            }

            if (Number(minPrice) > Number(maxPrice)) {
                setNotify(texts[currentLanguage].minpricetohigh);
                setPriceInputsError(true);
                return;
            }

            setPriceFilters(Number(minPrice), Number(maxPrice));
            handleOpenFilterSubmenu('price');
            return;
        }

        if (maxPrice) {
            setPriceFilters(0, Number(maxPrice));
            handleOpenFilterSubmenu('price');
            return;
        }

        if (minPrice) {
            setPriceFilters(Number(minPrice), 0);
            handleOpenFilterSubmenu('price');
            return;
        }

        setPriceFilters(0, 0);
    };

    const handleOpenFilterSubmenu = (submenuName: 'size' | 'price' | 'sortby') => {
        setActiveFilterSubmenu((prev) => ({
            ...prev,
            [submenuName]: !prev[submenuName],
        }));
    };

    return (
        <>
            <ProductsFilterButtonSection>
                <div className="container">
                    <button className="filter-button" onClick={() => setIsFiltersCartOpen(true)}>
                        <span>{texts[currentLanguage].filters}</span>
                        <MdOutlineKeyboardArrowDown />
                    </button>
                </div>
            </ProductsFilterButtonSection>
            <ProductsFilterSection isOpen={isFiltersCartOpen}>
                <div className="filters-header">
                    <div className="container">
                        <div className="inner-filters-header">
                            <h2 className="Filters">{texts[currentLanguage].filters}</h2>
                            <button onClick={() => handleCloseFiltersCart()}>
                                <IoIosClose />
                            </button>
                        </div>
                    </div>
                </div>
                <form className="filters-list">
                    <div className="container">
                        <div className="inner-filters-list">
                            {filtersOptions.map((filteritem) => (
                                <FilterItem
                                    submenuOpen={activeFilterSubmenu[filteritem.name]}
                                    key={filteritem.name}
                                    error={priceInputsError}
                                >
                                    <p className="filter-title">{texts[currentLanguage][filteritem.name]}</p>
                                    {filteritem.name === 'price' ? (
                                        <>
                                            <div className="filter-value" onClick={() => handleOpenFilterSubmenu(filteritem.name)}>
                                                <span>{handleFilterValue(undefined, true)}</span>
                                                <MdOutlineKeyboardArrowDown />
                                            </div>
                                            <div className="price-inputs__wrapper">
                                                <div className="input-wrapper">
                                                    <input
                                                        id={filteritem.name}
                                                        name="minPrice"
                                                        inputMode="numeric"
                                                        placeholder={texts[currentLanguage].from}
                                                        ref={minPriceRef}
                                                    />
                                                    <span>{texts[currentLanguage].currency}</span>
                                                </div>
                                                <span> - </span>
                                                <div className="input-wrapper">
                                                    <input
                                                        id={filteritem.name}
                                                        name="maxPrice"
                                                        inputMode="numeric"
                                                        placeholder={texts[currentLanguage].to}
                                                        ref={maxPriceRef}
                                                    />
                                                    <span>{texts[currentLanguage].currency}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        handlePriceFilters(minPriceRef.current?.value, maxPriceRef.current?.value);
                                                    }}
                                                >
                                                    Set prices
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="filter-value" onClick={() => handleOpenFilterSubmenu(filteritem.name)}>
                                            <span>{handleFilterValue(filterValues[filteritem.name])}</span>
                                            <MdOutlineKeyboardArrowDown />
                                        </div>
                                    )}

                                    {filteritem.options ? (
                                        <ul>
                                            {filteritem.options.map((subitem, index) => {
                                                const isChecked =
                                                    filteritem.name !== 'price' && handleInputCheck(filterValues[filteritem.name], subitem);

                                                return (
                                                    <li key={subitem + index}>
                                                        <input
                                                            id={subitem}
                                                            name={filteritem.name}
                                                            value={subitem}
                                                            type={filteritem.inputtype}
                                                            checked={isChecked}
                                                            onChange={handleChangeFilters}
                                                        />
                                                        <label htmlFor={subitem}>
                                                            {filteritem.name === 'size' ? subitem : texts[currentLanguage][subitem]}
                                                        </label>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : null}
                                    <button
                                        type="button"
                                        className="clear-filter-button"
                                        onClick={() => {
                                            if (filteritem.name === 'price') {
                                                if (minPriceRef.current) minPriceRef.current.value = '';
                                                if (maxPriceRef.current) maxPriceRef.current.value = '';
                                            }
                                            clearFilters(filteritem.name === 'price' ? 'minPrice' : filteritem.name);
                                        }}
                                    >
                                        {texts[currentLanguage].clear}
                                    </button>
                                </FilterItem>
                            ))}
                        </div>
                    </div>
                </form>
                <div className="filters-buttons">
                    <div className="container">
                        <div className="inner-filters-buttons">
                            <button className="clear-filters" onClick={() => handleCloseFiltersCart('clear filters')}>
                                {texts[currentLanguage].clearfilters}
                            </button>
                            <button className="set-filters" onClick={() => handleCloseFiltersCart('set filters')}>
                                {texts[currentLanguage].setfilters}
                            </button>
                        </div>
                    </div>
                </div>
            </ProductsFilterSection>
            {isFiltersCartOpen ? <PopupOverlay websiteTheme={websiteTheme} closeAnimation={false} /> : null}
        </>
    );
};

export default ProductsFilter;
