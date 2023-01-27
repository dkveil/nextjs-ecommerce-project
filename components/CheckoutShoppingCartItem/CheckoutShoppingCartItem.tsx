import { CheckoutItemContainer } from './CheckoutShoppingCartItem.styles';
import { useGlobalContext } from '../../context/GlobalContext';
import Image from 'next/image';
import Link from 'next/link';
import texts from '../ShoppingCartItem/texts';

interface ICheckoutItem {
    img: string;
    name: {
        ENG: string;
        PL: string;
    };
    categoryid: string;
    slug: string;
    price: {
        ENG: number;
        PL: number;
    };
    quantity: number;
    size: string;
}

const CheckoutItem = ({ img, name, categoryid, slug, price, quantity, size }: ICheckoutItem) => {
    const { currentLanguage } = useGlobalContext();

    return (
        <CheckoutItemContainer>
            <Link href={`products/${categoryid}/${slug}`}>
                <div className="image-wrapper">
                    <Image src={img} alt={name[currentLanguage]} fill style={{ objectFit: 'cover' }} />
                </div>
            </Link>
            <div className="checkout-item__info">
                <div className="checkout-item__header">
                    <h3>
                        <Link href={`products/${categoryid}/${slug}`}>{name[currentLanguage]}</Link>
                    </h3>
                    <p>{texts[currentLanguage][categoryid]}</p>
                    <span className="checkout-item__size">
                        {texts[currentLanguage].size} {size}
                    </span>
                </div>
                <span className="checkout-item__quantity">
                    {texts[currentLanguage].quantity}: {quantity}
                </span>
            </div>
            <div className="checkout-item__price">
                {texts[currentLanguage].currency} {price[currentLanguage].toFixed(2)}
            </div>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;
