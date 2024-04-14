import localFont from 'next/font/local'

const GothamPro = localFont({
  display: 'swap',
  preload: true,
  variable: '--local-font',
  src: [
    {
      path: './localFont/GothamPro-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './localFont/GothamPro-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './localFont/GothamPro.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './localFont/GothamPro-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './localFont/GothamPro.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './localFont/GothamPro-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './localFont/GothamPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './localFont/GothamPro-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './localFont/GothamPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './localFont/GothamPro-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './localFont/GothamPro-MediumItalic.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './localFont/GothamPro-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: './localFont/GothamPro-BoldItalic.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './localFont/GothamPro-BoldItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
})
export default GothamPro
export { GothamPro }
