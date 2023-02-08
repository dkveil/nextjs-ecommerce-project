import React from 'react';
import ReactDOM from 'react-dom';
import { NotifyWrapper } from './Notify.styles';
import { useGlobalContext } from '../../context/GlobalContext';

const Notify = ({ notify }: { notify: string | null }) => {
    const [isBrowser, setBrowser] = React.useState(false);
    const [closeAnimation, setCloseAnimation] = React.useState<boolean>(false);

    const { setNotify, websiteTheme } = useGlobalContext();

    React.useEffect(() => {
        if (notify) {
            setBrowser(true);
            setTimeout(() => {
                setCloseAnimation(true);
            }, 4000);

            setTimeout(() => {
                setNotify(null);
                setCloseAnimation(false);
            }, 4400);
        }
    }, [notify]);

    if (!notify) return null;

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
