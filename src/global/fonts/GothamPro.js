import localFont from 'next/font/local'

const GothamPro = localFont({
  display: 'swap',
  preload: true,
  variable: '--font-gotham-pro',
  src: [
    {
      path: './GothamPro/GothamPro-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './GothamPro/GothamPro-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './GothamPro/GothamPro.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './GothamPro/GothamPro-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './GothamPro/GothamPro.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './GothamPro/GothamPro-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './GothamPro/GothamPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './GothamPro/GothamPro-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './GothamPro/GothamPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './GothamPro/GothamPro-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './GothamPro/GothamPro-MediumItalic.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './GothamPro/GothamPro-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: './GothamPro/GothamPro-BoldItalic.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './GothamPro/GothamPro-BoldItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
})
export default GothamPro
export { GothamPro }
