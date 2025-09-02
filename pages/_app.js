// pages/_app.js - ATUALIZADO COM HEAD
import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Título padrão para todas as páginas */}
        <title>Salgados Premium - Sabor Artesanal desde 2020</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
