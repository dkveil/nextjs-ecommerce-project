import React from 'react';
import { CheckoutFormWrapper, InputWrapper } from './CheckoutForm.styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import texts from './texts';
import { useGlobalContext } from '../../context/GlobalContext';
import { postData } from '../../utils/fetchData';
import LoadingSpinner from '../Loading/Loading';

export interface CheckoutFormModel {
    name: string;
    lastName: string;
    email?: string;
    phone: string;
    street: string;
    city: string;
    postcode: string;
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const CheckoutForm = ({ type, totalPrice }: { type: 'user' | 'guest'; totalPrice: number }) => {
    const { user, currentLanguage, shoppingcart, updateShoppingCartItems, clearShoppingCart, setNotify, setWishlistState } =
        useGlobalContext();
    const [loading, setLoading] = React.useState<boolean>(false);

    const validateSchema = {
        name: Yup.string().required(texts[currentLanguage].namerequired),
        lastName: Yup.string().required(texts[currentLanguage].lastNamerequired),
        phone: Yup.string()
            .matches(phoneRegExp, texts[currentLanguage].invalidformat)
            .min(9, texts[currentLanguage].invalidformat)
            .required(texts[currentLanguage].phonerequired),
        street: Yup.string().required(texts[currentLanguage].streetrequired),
        city: Yup.string().required(texts[currentLanguage].cityrequired),
        postcode: Yup.string().required(texts[currentLanguage].postcoderequired),
    };

    const guestSchema = {
        email: Yup.string().email(texts[currentLanguage].invalidformat).required(texts[currentLanguage].emailrequired),
    };

    const formik = useFormik<CheckoutFormModel>({
        initialValues: {
            name: user?.data.firstName || '',
            lastName: user?.data.lastName || '',
            email: user?.data.email || '',
            phone: user?.data.phone || '',
            street: '',
            city: '',
            postcode: '',
        },
        onSubmit: async (values) => {
            const { name, lastName, email, phone, street, city, postcode } = values;

            const orderData = {
                name,
                lastName,
                email,
                phone,
                street,
                city,
                postcode,
                shoppingcart,
                totalPrice,
                currency: texts[currentLanguage].currency,
                isUser: Boolean(user),
            };

            try {
                setLoading(true);

                const cartChanges = await updateShoppingCartItems();

                if (cartChanges.length > 0) {
                    setNotify(texts[currentLanguage].cartupdated);
                    return;
                }

                const { messageid } = await postData('order', orderData, user?.accessToken);

                if (user && messageid === 'success') {
                    const filteredWishlist = user?.data.wishlist.filter(
                        (wishlistItem: { productId: string }) => !shoppingcart.some((item) => item._id === wishlistItem.productId)
                    );
                    setWishlistState(filteredWishlist);
                    setNotify(texts[currentLanguage].successuser);
                } else {
                    setNotify(texts[currentLanguage].successguest);
                }

                clearShoppingCart();
            } catch (error) {
                setNotify(texts[currentLanguage].unknowerror);
            } finally {
                setLoading(false);
            }
        },
        validationSchema: Yup.object().shape(user ? validateSchema : Object.assign(validateSchema, guestSchema)),
        validateOnBlur: false,
        validateOnChange: false,
        enableReinitialize: true,
    });

    const { handleSubmit, values, handleChange, errors } = formik;

    if (type) {
        return (
            <CheckoutFormWrapper isLoading={loading} onSubmit={handleSubmit}>
                <h2>{texts[currentLanguage].shippingdetails}</h2>
                <div className="form-inputs">
                    <div className="inputs-group">
                        <InputWrapper error={Boolean(errors.name)}>
                            <input id="name" value={values.name} onChange={handleChange} placeholder={texts[currentLanguage].name} />
                            {errors.name ? <div className="error-message">{errors.name}</div> : null}
                        </InputWrapper>
                        <InputWrapper error={Boolean(errors.lastName)}>
                            <input
                                id="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                placeholder={texts[currentLanguage].lastName}
                            />
                            {errors.lastName ? <div className="error-message">{errors.lastName}</div> : null}
                        </InputWrapper>
                    </div>
                    <div className="inputs-group">
                        {user ? null : (
                            <InputWrapper error={Boolean(errors.email)}>
                                <input id="email" type="email" value={values.email} onChange={handleChange} placeholder="E-mail" />
                                {errors.email ? <div className="error-message">{errors.email}</div> : null}
                            </InputWrapper>
                        )}
                        <InputWrapper error={Boolean(errors.phone)}>
                            <input id="phone" value={values.phone} onChange={handleChange} placeholder={texts[currentLanguage].phone} />
                            {errors.phone ? <div className="error-message">{errors.phone}</div> : null}
                        </InputWrapper>
                    </div>
                    <InputWrapper error={Boolean(errors.street)}>
                        <input id="street" value={values.street} onChange={handleChange} placeholder={texts[currentLanguage].street} />
                        {errors.street ? <div className="error-message">{errors.street}</div> : null}
                    </InputWrapper>
                    <div className="inputs-group">
                        <InputWrapper error={Boolean(errors.city)}>
                            <input id="city" value={values.city} onChange={handleChange} placeholder={texts[currentLanguage].city} />
                            {errors.city ? <div className="error-message">{errors.city}</div> : null}
                        </InputWrapper>
                        <InputWrapper error={Boolean(errors.postcode)}>
                            <input
                                id="postcode"
                                value={values.postcode}
                                onChange={handleChange}
                                placeholder={texts[currentLanguage].postcode}
                            />
                            {errors.postcode ? <div className="error-message">{errors.postcode}</div> : null}
                        </InputWrapper>
                    </div>
                </div>
                <button type="submit">{loading ? <LoadingSpinner /> : texts[currentLanguage].createorder}</button>
            </CheckoutFormWrapper>
        );
    }

    return null;
};

export default CheckoutForm;
