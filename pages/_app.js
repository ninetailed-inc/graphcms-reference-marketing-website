import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'

import { SiteLayout } from '@/layout'

import {
  PersonalizationProvider,
} from '@ninetailed/experience-sdk-nextjs';

import { defaultSEO } from '../next-seo.config'
import { theme } from '../styles/theme'
import '../styles/css/global.css'

export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <SiteLayout>{page}</SiteLayout>)

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...defaultSEO} />
      <PersonalizationProvider
            // // analyticsPlugins={{
            // //   googleAnalytics: {
            // //     trackingId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '',
            // //     actionTemplate: 'Audience:{{ audience.name }}',
            // //     labelTemplate:
            // //       '{{ baselineOrVariant }}:{{ component.__typename }} - {{ component.id }}',
            // //   },
            // // }}
            url="https://develop-api.ninetailed.co"
            apiKey={process.env.NEXT_PUBLIC_NINETAILED_API_KEY ?? ''}
          >
      {getLayout(<Component {...pageProps} />)}
      </PersonalizationProvider>
    </ChakraProvider>
  )
}
