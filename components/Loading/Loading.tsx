import styled, { keyframes, css } from 'styled-components';
import { VscLoading } from 'react-icons/vsc';

const spinning = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }

`;

const LoadingSpinnerWrapper = styled.span`
    svg {
        width: 40px;
        height: 40px;
        animation: ${spinning} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    }
`;

const LoadingSpinner = () => {
    return (
        <LoadingSpinnerWrapper>
            <VscLoading />
        </LoadingSpinnerWrapper>
    );
};

export default LoadingSpinner;
