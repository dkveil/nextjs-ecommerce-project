import React from 'react';
import ReactDOM from 'react-dom';
import { NotifyWrapper } from './Notify.styles';
import { useGlobalContext } from '../../context/GlobalContext';

const Notify = ({ websiteTheme }: { websiteTheme: 'light theme' | 'dark theme' }) => {
    const { notify, setNotify } = useGlobalContext();

    if (!notify) return null;

    const [isBrowser, setBrowser] = React.useState(false);
    const [closeAnimation, setCloseAnimation] = React.useState<boolean>(false);

    React.useEffect(() => {
        setBrowser(true);
        setTimeout(() => {
            setCloseAnimation(true);
        }, 4000);

        setTimeout(() => {
            setNotify(null);
        }, 4400);

        return () => {
            setBrowser(false);
            setCloseAnimation(false);
        };
    }, []);

    if (isBrowser) {
        return ReactDOM.createPortal(
            <NotifyWrapper closeAnimation={closeAnimation} websiteTheme={websiteTheme}>
                {notify}
            </NotifyWrapper>,
            document.getElementById('notify')!
        );
    }

    return null;
};

export default Notify;
