import { ShoppingCartItemWrapper } from './ShoppingCartItem.styles';
import { useGlobalContext } from '../../context/GlobalContext';
import Image from 'next/image';
import type { IShoppingCartItem } from '../../types/ShoppingCartItem.types';
import texts from './texts';
import Link from 'next/link';
import { BiPlus, BiMinus } from 'react-icons/bi';

const ShoppingCartItem = ({ _id, size, name, img, categoryid, price, slug, quantity }: IShoppingCartItem) => {
    const { addShoppingCartItem, subShoppingCartItem, removeShoppingCartItem, currentLanguage } = useGlobalContext();

    return (
        <ShoppingCartItemWrapper>
            <td className="cart-item__img">
                <Link href={`/${categoryid}/${slug}`}>
                    <div className="image-wrapper">
                        <Image src={img} fill style={{ objectFit: 'cover' }} alt={name[currentLanguage]} />
                    </div>
                </Link>
            </td>
            <td className="cart-item__name">
                <h5>
                    <Link href="">{name[currentLanguage]}</Link>
                </h5>
                <p>
                    <Link href="">{texts[currentLanguage][categoryid]}</Link>
                </p>
            </td>
            <td className="cart-item__size">
                <span>
                    {texts[currentLanguage].size} {size}
                </span>
            </td>
            <td className="cart-item__quantity">
                <div className="buttons-group">
                    <button onClick={() => subShoppingCartItem({ _id, size }, true)}>
                        <BiMinus />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => addShoppingCartItem({ _id, size }, true)}>
                        <BiPlus />
                    </button>
                </div>
                <button className="remove-button" onClick={() => removeShoppingCartItem({ _id, size })}>
                    Remove
                </button>
            </td>
            <td className="cart-item__price">
                {texts[currentLanguage].currency} {price[currentLanguage].toFixed(2)}
            </td>
        </ShoppingCartItemWrapper>
    );
};

export default ShoppingCartItem;
