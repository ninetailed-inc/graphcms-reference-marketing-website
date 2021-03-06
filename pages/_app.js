import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import {
  NinetailedProvider,
} from '@ninetailed/experience.js-next'
// import { NinetailedGoogleAnalyticsPlugin } from '@ninetailed/experience.js-plugin-google-analytics'
// import { NinetailedPreviewPlugin } from '@ninetailed/experience.js-plugin-preview'

import { SiteLayout } from '@/layout'

import { defaultSEO } from '../next-seo.config'
import { theme } from '../styles/theme'
import '../styles/css/global.css'

export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <SiteLayout>{page}</SiteLayout>)

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...defaultSEO} />
      <NinetailedProvider
        clientId={process.env.NEXT_PUBLIC_NINETAILED_CLIENT_ID ?? ''}
        environment={process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT ?? ''}
        url={process.env.NEXT_PUBLIC_NINETAILED_URL ?? ''}
        // plugins={[
        //   NinetailedSsrPlugin(),
        //   NinetailedPreviewPlugin({ clientId: '085abef3-67a9-463f-a22d-6c8db44218c5', secret: '58ec390d-83ea-4e76-9ffd-8c22b63f71b0' }),
        //   NinetailedGoogleAnalyticsPlugin({ trackingId: 'UA-155' })
        // ]}
      >
        {getLayout(<Component {...pageProps} />)}
      </NinetailedProvider>
    </ChakraProvider>
  )
}
