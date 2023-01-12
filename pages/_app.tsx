import type { AppProps } from 'next/app';
import MainLayout from '../layouts/MainLayout';
import { GlobalContextProvider } from '../context/GlobalContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <GlobalContextProvider>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </GlobalContextProvider>
    );
}
