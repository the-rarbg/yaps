import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='shortcut icon' href='/logo.svg' type='image/x-icon' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          href='https://vjs.zencdn.net/8.5.2/video-js.css'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='https://unicons.iconscout.com/release/v4.0.0/css/unicons.css'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'></link>
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Outfit:wght@300;500&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
