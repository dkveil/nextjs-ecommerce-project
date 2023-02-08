import Image from 'next/image';
import Link from 'next/link';
import { WishlistItemWrapper } from './WishlistItem.styles';
import { useGlobalContext } from '../../context/GlobalContext';
import monthToString from '../../utils/monthToString';
import texts from './texts';

export interface IWishlistItem {
    id: string;
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
    createdAt: string;
}

const WishlistItem = ({
    id,
    title,
    categoryid,
    img,
    price,
    slug,
    createdAt,
    handleWishlist,
}: IWishlistItem & { handleWishlist: (id: string) => void }) => {
    const { currentLanguage } = useGlobalContext();

    const date = new Date(createdAt);

    const formatedDate =
        currentLanguage &&
        `${monthToString({ currentLanguage, monthNumber: date.getMonth() + 1 })}
        ${date.getDate()}, ${date.getFullYear()}
        ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
            .getSeconds()
            .toString()
            .padStart(2, '0')}
        `;

    return (
        <WishlistItemWrapper>
            <div className="wishlist-product-header">
                <div className="image-wrapper">
                    <Image src={img} alt={title[currentLanguage]} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="wishlist-product-info">
                    <div className="wishlist-product-info__head">
                        <Link href={`/products/${categoryid}/slug`}>
                            <h3>{title[currentLanguage]}</h3>
                        </Link>
                        <p>{texts[currentLanguage][categoryid]}</p>
                    </div>
                    <button onClick={() => handleWishlist(id)}>{texts[currentLanguage].remove}</button>
                </div>
            </div>
            <div className="wishlist-product-details">
                <div className="wishlist-product-details__items">
                    <p className="wishlist-product-details__date">
                        <span>{texts[currentLanguage].dateadded}</span>
                        <span>{formatedDate}</span>
                    </p>
                    <div className="wishlist-product-details__price">
                        <span>{texts[currentLanguage].price}</span>
                        <span>
                            {texts[currentLanguage].currency} {price[currentLanguage].toFixed(2)}
                        </span>
                    </div>
                </div>
                <Link href={`/products/${categoryid}/${slug}`}>Product page</Link>
            </div>
        </WishlistItemWrapper>
    );
};

export default WishlistItem;
