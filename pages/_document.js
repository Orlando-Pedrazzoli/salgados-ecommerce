// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='pt'>
      <Head>
        {/* Favicon - Usando fire.svg */}
        <link rel='icon' href='/fire.svg' type='image/svg+xml' />
        <link rel='shortcut icon' href='/fire.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/fire.svg' />

        {/* Meta Tags */}
        <meta
          name='description'
          content='Salgados Premium - Os melhores salgados artesanais para seus eventos. Coxinha, rissol, pastel de bacalhau e muito mais. Entrega em Oeiras e Lisboa.'
        />
        <meta
          name='keywords'
          content='salgados, coxinha, rissol, pastel de bacalhau, festa, eventos, catering, Lisboa, Oeiras'
        />
        <meta name='author' content='Salgados Premium' />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content='Salgados Premium - Sabor Artesanal'
        />
        <meta
          property='og:description'
          content='Os melhores salgados artesanais para seus eventos especiais. Peça agora!'
        />
        <meta property='og:image' content='/og-image.jpg' />
        <meta property='og:site_name' content='Salgados Premium' />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='Salgados Premium - Sabor Artesanal'
        />
        <meta
          name='twitter:description'
          content='Os melhores salgados artesanais para seus eventos especiais.'
        />
        <meta name='twitter:image' content='/og-image.jpg' />

        {/* Cor do tema para mobile */}
        <meta name='theme-color' content='#f59e0b' />

        {/* Manifest para PWA (opcional) */}
        <link rel='manifest' href='/manifest.json' />

        {/* Fontes do Google (opcional) */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
