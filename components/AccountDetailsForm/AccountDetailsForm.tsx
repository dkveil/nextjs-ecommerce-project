import React from 'react';
import { useFormik } from 'formik';
import { AccountDetailsFormWrapper, InputWrapper } from './AccountDetailsForm.styles';
import LoadingSpinner from '../Loading/Loading';
import { useGlobalContext } from '../../context/GlobalContext';
import texts from './texts';
import * as Yup from 'yup';
import { patchData } from '../../utils/fetchData';

interface FormModel {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const AccountDetailsForm = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const { currentLanguage, user, setNotify, setUserDetails } = useGlobalContext();

    console.log(user);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string(),
        lastName: Yup.string(),
        email: Yup.string().email(texts[currentLanguage].invalidFormat),
        phone: Yup.string().matches(phoneRegExp, texts[currentLanguage].invalidFormat),
        currentPassword: Yup.string(),
        newPassword: Yup.string().when(['currentPassword'], {
            is: (currentPassword: string) => currentPassword?.length > 0,
            then: Yup.string().required(texts[currentLanguage].fieldrequired).min(6, texts[currentLanguage].min6passwordcharacters),
            otherwise: Yup.string().notRequired(),
        }),
        confirmNewPassword: Yup.string().when('currentPassword', {
            is: (currentPassword: string) => currentPassword?.length > 0,
            then: Yup.string().oneOf([Yup.ref('newPassword'), null], texts[currentLanguage].matchpassword),
            otherwise: Yup.string().notRequired(),
        }),
    });

    const formik = useFormik<FormModel>({
        initialValues: {
            firstName: user?.data.firstName || '',
            lastName: user?.data.lastName || '',
            email: user?.data.email || '',
            phone: user?.data.phone || '',
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        onSubmit: async (values) => {
            setLoading(true);

            try {
                const { messageid, data } = await patchData('user/patch', { ...values }, user?.accessToken);

                console.log(data);

                setNotify(texts[currentLanguage][messageid]);
            } catch (error) {
                setNotify(texts[currentLanguage].unknowerror);
            } finally {
                setLoading(false);
            }
        },
        validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        enableReinitialize: true,
    });

    const { handleSubmit, values, errors, handleChange } = formik;

    return (
        <AccountDetailsFormWrapper isLoading={loading} onSubmit={handleSubmit}>
            <div className="form-inputs">
                <div className="inputs-group">
                    <input id="firstName" value={values.firstName} onChange={handleChange} placeholder={texts[currentLanguage].firstName} />
                    <input id="lastName" value={values.lastName} onChange={handleChange} placeholder={texts[currentLanguage].lastName} />
                </div>
                <div className="inputs-group">
                    <InputWrapper error={Boolean(errors.email)}>
                        <input id="email" value={values.email} onChange={handleChange} placeholder="E-mail" />
                        {errors.email ? <div className="error-message">{errors.email}</div> : null}
                    </InputWrapper>
                    <InputWrapper error={Boolean(errors.phone)}>
                        <input id="phone" value={values.phone} onChange={handleChange} placeholder={texts[currentLanguage].phone} />
                        {errors.phone ? <div className="error-message">{errors.phone}</div> : null}
                    </InputWrapper>
                </div>
                <fieldset>
                    <legend>{texts[currentLanguage].changepassword}</legend>
                    <InputWrapper error={Boolean(errors.currentPassword)}>
                        <input
                            id="currentPassword"
                            type="password"
                            value={values.currentPassword}
                            onChange={handleChange}
                            placeholder={texts[currentLanguage].currentPassword}
                        />
                        {errors.currentPassword ? <div className="error-message">{errors.currentPassword}</div> : null}
                    </InputWrapper>
                    <InputWrapper error={Boolean(errors.newPassword)}>
                        <input
                            id="newPassword"
                            type="password"
                            value={values.newPassword}
                            onChange={handleChange}
                            placeholder={texts[currentLanguage].newPassword}
                        />
                        {errors.newPassword ? <div className="error-message">{errors.newPassword}</div> : null}
                    </InputWrapper>
                    <InputWrapper error={Boolean(errors.confirmNewPassword)}>
                        <input
                            id="confirmNewPassword"
                            type="password"
                            value={values.confirmNewPassword}
                            onChange={handleChange}
                            placeholder={texts[currentLanguage].confirmNewPassword}
                        />
                        {errors.confirmNewPassword ? <div className="error-message">{errors.confirmNewPassword}</div> : null}
                    </InputWrapper>
                </fieldset>
            </div>
            <button>{loading ? <LoadingSpinner /> : texts[currentLanguage].save}</button>
        </AccountDetailsFormWrapper>
    );
};

export default AccountDetailsForm;
