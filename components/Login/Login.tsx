import React from 'react';
import texts from './texts';
import { LoginContainer, InputWrapper } from './Login.styles';
import { useLanguageContext } from '../../context/LanguageContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormModel {
    email: string;
    password: string;
    confirmPassword?: string;
}

const Login = ({ type }: { type: 'login' | 'register' }) => {
    const { currentLanguage } = useLanguageContext();
    const [formType, setFormType] = React.useState<'login' | 'register'>(type);

    const validateSchema = {
        login: Yup.string().email(texts[currentLanguage].invalidemail).required(texts[currentLanguage].requiredfield),
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
        onSubmit: (values) => {
            console.log(values);
        },
        validationSchema: Yup.object().shape(formType === 'login' ? validateSchema : Object.assign(validateSchema, confirmPasswordSchema)),
        validateOnBlur: false,
        validateOnChange: false,
        enableReinitialize: true,
    });

    const handleChangeFormType = () => setFormType(formType === 'login' ? 'register' : 'login');

    const { handleSubmit, values, handleChange, errors } = formik;

    return (
        <LoginContainer onSubmit={handleSubmit}>
            <div className="inner-form">
                <h2 className="title">
                    {formType === 'login' ? texts[currentLanguage].welcomelogin : texts[currentLanguage].welcomeregister}
                </h2>
                <p className="form-information">
                    {formType === 'login' ? texts[currentLanguage].loginusingmail : texts[currentLanguage].registerusingmail}
                </p>
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
                    {formType === 'login' ? texts[currentLanguage].loginbutton : texts[currentLanguage].registerbutton}
                </button>
            </div>
            <div className="form-footer">
                {texts[currentLanguage].noacc}
                <a href="#" onClick={handleChangeFormType}>
                    {texts[currentLanguage].noaccbutton}
                </a>
            </div>
        </LoginContainer>
    );
};

export default Login;
