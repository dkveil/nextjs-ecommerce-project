import React from 'react';
import Link from 'next/link';
import { useGlobalContext } from '../../context/GlobalContext';
import { FooterContainer, FooterWidget } from './Footer.styles';
import texts from './texts';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { BiPlus, BiMinus } from 'react-icons/bi';

const socialMediaItems = [
    {
        id: 'facebook',
        icon: <FaFacebookF />,
        link: '#',
    },
    {
        id: 'instagram',
        icon: <FaInstagram />,
        link: '#',
    },
    {
        id: 'youtube',
        icon: <FaYoutube />,
        link: '#',
    },
    {
        id: 'twitter',
        icon: <FaTwitter />,
        link: '#',
    },
];

const Footer = () => {
    const [openWidget, setOpenWidget] = React.useState([false, false]);

    const { currentLanguage } = useGlobalContext();

    return (
        <FooterContainer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-items-group">
                        <div className="footer-logo">
                            <h3>NSGNIX</h3>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita perferendis quae molestiae rem deleniti
                                inventore repellat commodi, voluptates, dicta nostrum nam accusamus, quibusdam veritatis alias.
                            </p>
                        </div>
                        <FooterWidget open={openWidget[0]}>
                            <h3 onClick={() => setOpenWidget((prev) => [!prev[0], prev[1]])}>
                                {texts[currentLanguage].contact} {openWidget[0] ? <BiMinus /> : <BiPlus />}
                            </h3>
                            <div className="footer-widget__content">
                                <p>
                                    Stanislawa Wyspianskiego 5, Tarnobrzeg <br />
                                    (123)456-7890 <br />
                                    contact@fakemail.com
                                </p>
                            </div>
                        </FooterWidget>
                        <FooterWidget open={openWidget[1]}>
                            <h3 onClick={() => setOpenWidget((prev) => [prev[0], !prev[1]])}>
                                {texts[currentLanguage].openinghours} {openWidget[1] ? <BiMinus /> : <BiPlus />}
                            </h3>
                            <div className="footer-widget__content">
                                <p>
                                    {texts[currentLanguage].monday}
                                    <br />
                                    {texts[currentLanguage].tuesday}
                                    <br />
                                    {texts[currentLanguage].wednesday}
                                    <br />
                                    {texts[currentLanguage].thursday}
                                    <br />
                                    {texts[currentLanguage].friday}
                                    <br />
                                    {texts[currentLanguage].saturday}
                                    <br />
                                    {texts[currentLanguage].sunday}
                                </p>
                            </div>
                        </FooterWidget>
                    </div>
                    <div className="footer-socials">
                        <h3>{texts[currentLanguage].followus}</h3>
                        <ul>
                            {socialMediaItems.map((item) => (
                                <li key={item.id}>
                                    <Link href={item.link} target="_blank">
                                        {item.icon}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="footer-info">
                    <div className="footer-info__socials">
                        <ul>
                            {socialMediaItems.map((item) => (
                                <li key={item.id}>
                                    <Link href={item.link} target="_blank">
                                        {item.icon}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer-info__copyright">
                        © made by <Link href="https://github.com/dkveil">Damian Kądziela</Link>
                    </div>
                </div>
            </div>
        </FooterContainer>
    );
};

export default Footer;
