import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link href="/fonts/ProximaNovaBold.woff2" as="font" type="font/woff2" crossOrigin="" />
                    <link href="/fonts/ProximaNovaRegular.woff2" as="font" type="font/woff2" crossOrigin="" />
                    <link href="/fonts/ProximaNovaThin.woff2" as="font" type="font/woff2" crossOrigin="" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <div id="modal-root" />
                    <div id="popup" />
                    <div id="notify" />
                </body>
            </Html>
        );
    }
}
