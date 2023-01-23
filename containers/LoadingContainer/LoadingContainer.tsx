import styled from 'styled-components';
import LoadingSpinner from '../../components/Loading/Loading';
import { useGlobalContext } from '../../context/GlobalContext';

const StyledLoadingContainer = styled.div<{ websiteTheme: 'light theme' | 'dark theme' }>`
    display: grid;
    place-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ websiteTheme }) => (websiteTheme === 'light theme' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)')};
    z-index: ${({ theme }) => theme.zindex.loadingcontainer};

    svg {
        fill: ${({ websiteTheme }) => (websiteTheme === 'light theme' ? 'white' : 'black')};
    }
`;

const LoadingContainer = ({ open }: { open: boolean }) => {
    const { websiteTheme } = useGlobalContext();

    if (open) {
        return (
            <StyledLoadingContainer websiteTheme={websiteTheme}>
                <LoadingSpinner />
            </StyledLoadingContainer>
        );
    }

    return null;
};

export default LoadingContainer;
