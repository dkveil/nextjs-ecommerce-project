import React from 'react';
import texts from './texts';
import { LoginContainer, InputWrapper } from './Login.styles';
import { useGlobalContext } from '../../context/GlobalContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postData } from '../../utils/fetchData';
import LoadingSpinner from '../Loading/Loading';
import Cookie from 'js-cookie';

interface FormModel {
    email: string;
    password: string;
    confirmPassword?: string;
}

const Login = ({
    type,
    closeLoginForm,
    checkoutLogin,
}: {
    type: 'login' | 'register';
    closeLoginForm?: () => void;
    checkoutLogin?: boolean;
}) => {
    const { currentLanguage, setNotify, handleLogin, user } = useGlobalContext();

    if (user) return null;

    const [formType, setFormType] = React.useState<'login' | 'register'>(type);
    const [loading, setLoading] = React.useState<boolean>(false);

    const validateSchema = {
        email: Yup.string().email(texts[currentLanguage].invalidemail).required(texts[currentLanguage].requiredfield),
        password: Yup.string().min(6, texts[currentLanguage].min6passwordcharacters).required(texts[currentLanguage].requiredfield),
    };

    const confirmPasswordSchema = {
        confirmPassword: Yup.string()
            .required(texts[currentLanguage].requiredfield)
            .oneOf([Yup.ref('password')], texts[currentLanguage].matchpassword),
    };

    const formik = useFormik<FormModel>({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: async (values) => {
            if (loading) return null;

            setLoading(true);

            const userData = {
                email: values.email,
                password: values.password,
            };

            try {
                const res = await postData(formType === 'register' ? 'auth/register' : 'auth/login', userData);

                const { accessToken, refreshToken, data, messageid } = res;

                setNotify(texts[currentLanguage][res.messageid]);

                if (messageid === 'unknowerror') {
                    return;
                }

                if (messageid === 'emailalreadyexists') {
                    return;
                }

                if (messageid === 'incorectdata') {
                    return;
                }

                handleLogin(refreshToken, {
                    accessToken,
                    data,
                });

                localStorage.setItem('firstLogin', 'true');
                closeLoginForm ? closeLoginForm() : null;
            } catch (error) {
                setNotify(texts[currentLanguage].unknowerror);
            } finally {
                setLoading(false);
            }
        },
        validationSchema: Yup.object().shape(formType === 'login' ? validateSchema : Object.assign(validateSchema, confirmPasswordSchema)),
        validateOnBlur: false,
        validateOnChange: false,
        enableReinitialize: true,
    });

    const handleChangeFormType = () => setFormType(formType === 'login' ? 'register' : 'login');

    const { handleSubmit, values, handleChange, errors } = formik;

    return (
        <LoginContainer onSubmit={handleSubmit} isLoading={loading ? loading : undefined} checkoutLogin={checkoutLogin}>
            <div className="inner-form">
                {!checkoutLogin && (
                    <>
                        <h2 className="title">
                            {formType === 'login' ? texts[currentLanguage].welcomelogin : texts[currentLanguage].welcomeregister}
                        </h2>
                        <p className="form-information">
                            {formType === 'login' ? texts[currentLanguage].loginusingmail : texts[currentLanguage].registerusingmail}
                        </p>
                    </>
                )}
                <div className="inputs-wrapper">
                    <InputWrapper error={Boolean(errors.email)}>
                        <input
                            id="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder={texts[currentLanguage].emailplaceholder}
                        />
                        {errors.email ? <div className="error-message">{errors.email}</div> : null}
                    </InputWrapper>
                    <InputWrapper error={Boolean(errors.password)}>
                        <input
                            id="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder={texts[currentLanguage].passwordplaceholder}
                        />
                        {errors.password ? <div className="error-message">{errors.password}</div> : null}
                    </InputWrapper>
                    {formType === 'register' ? (
                        <InputWrapper error={Boolean(errors.confirmPassword)}>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                placeholder={texts[currentLanguage].confirmpasswordplaceholder}
                            />
                            {errors.confirmPassword ? <div className="error-message">{errors.confirmPassword}</div> : null}
                        </InputWrapper>
                    ) : null}
                </div>
                <button type="submit">
                    {loading ? (
                        <LoadingSpinner />
                    ) : formType === 'login' ? (
                        texts[currentLanguage].loginbutton
                    ) : (
                        texts[currentLanguage].registerbutton
                    )}
                </button>
            </div>
            <div className="form-footer">
                {formType === 'login' ? texts[currentLanguage].noacc : texts[currentLanguage].alreadyacc}
                <a href="#" onClick={handleChangeFormType}>
                    {formType === 'login' ? texts[currentLanguage].noaccbutton : texts[currentLanguage].alreadyaccbutton}
                </a>
            </div>
        </LoginContainer>
    );
};

export default Login;
