import React from 'react';
import ReactDOM from 'react-dom';
import { ModalContainer } from './Modal.styles';
import { IoIosClose } from 'react-icons/io';
import { useGlobalContext } from '../../context/GlobalContext';

interface IModal {
    children: React.ReactNode;
    show: boolean;
    closeModal: () => void;
}

const Modal = ({ show, children, closeModal }: IModal) => {
    const [isBrowser, setIsBrowser] = React.useState<boolean>(false);
    const [closeAnimation, setCloseAnimation] = React.useState<boolean>(false);

    const { websiteTheme } = useGlobalContext();

    React.useEffect(() => {
        setIsBrowser(true);

        return () => setIsBrowser(false);
    }, []);

    const handleCloseModal = () => {
        setCloseAnimation(true);
        setTimeout(() => {
            setCloseAnimation(false);
            closeModal();
        }, 400);
    };

    if (isBrowser && show) {
        return ReactDOM.createPortal(
            <ModalContainer closeAnimation={closeAnimation} websiteTheme={websiteTheme}>
                <div className="container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={handleCloseModal}>
                                <IoIosClose />
                            </button>
                        </div>
                        <div className="modal-body">{children}</div>
                    </div>
                </div>
                <div className="modal-overlay" onClick={handleCloseModal} />
            </ModalContainer>,
            document.getElementById('modal-root')!
        );
    } else return null;
};

export default Modal;
