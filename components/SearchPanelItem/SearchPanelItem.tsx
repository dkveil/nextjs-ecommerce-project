import { SearchPanelItemWrapper } from './SearchPanel.styles';
import Image from 'next/image';
import { useGlobalContext } from '../../context/GlobalContext';
import texts from '../ShoppingCartItem/texts';

export interface ISearchPanelItem {
    title: {
        ENG: string;
        PL: string;
    };
    categoryid: string;
    img: string;
    price: {
        ENG: number;
        PL: number;
    };
    slug: string;
}

const SearchPanelItem = ({ title, categoryid, img, price, slug }: ISearchPanelItem) => {
    const { currentLanguage } = useGlobalContext();

    return (
        <SearchPanelItemWrapper href={`/products/${categoryid}/${slug}`}>
            <div className="item-details">
                <span className="item-name">
                    {title[currentLanguage]}
                    <span className="item-category">{texts[currentLanguage][categoryid]}</span>
                </span>
                <span className="item-price">
                    {texts[currentLanguage].currency} {price[currentLanguage].toFixed(2)}
                </span>
            </div>

            <div className="image-wrapper">
                <Image src={img} alt={title[currentLanguage]} fill style={{ objectFit: 'cover' }} />
            </div>
        </SearchPanelItemWrapper>
    );
};

export default SearchPanelItem;
