import { Box, Container, Heading } from '@chakra-ui/react'
import { MDXRemote } from 'next-mdx-remote'
import { Personalize } from '@ninetailed/experience-sdk-nextjs'

import { getSiteLayout } from '@/layout'
import Hero from '@/components/hero'
import * as Marketing from '@/marketing'
import Navigation from '@/components/navigation'
import SEO from '@/components/seo'

export default function PageLayout({ children, page }) {
  const pageBanner = page?.marketing?.find(
    (block) => block.__typename === 'Banner'
  )

  const pageNewsletter = page?.marketing?.find(
    (block) => block.__typename === 'Newsletter'
  )

  return (
    <>
      {page?.seo && <SEO {...page.seo} />}

      {pageBanner && (
        <Personalize
          {...pageBanner}
          component={Marketing.Banner}
        />
      )}

      {page?.hero ? (
        <Personalize
          {...page.hero}
          navigation={page.navigation}
          page={page}
          component={Hero}
          variants={
            page.hero.variants.map((variant) => ({
              ...variant,
              navigation: page.navigation,
              page
            })) || []
          }
        />
      ) : (
        <>
          <Personalize {...page?.navigation} component={Navigation}  />
          <Box mx="auto" pt={24} px={[4, 6, null, 8]}>
            <Box
              display={[null, 'flex']}
              flexDir={[null, 'column']}
              alignItems={[null, 'center']}
              textAlign={[null, 'center']}
            >
              <Heading
                as="h1"
                fontSize="5xl"
                lineHeight="none"
                fontWeight="extrabold"
                color="gray.900"
              >
                {page?.title}
              </Heading>
              {page?.subtitle && (
                <Container
                  mt={5}
                  p={0}
                  centerContent
                  color="gray.500"
                  lineHeight="tall"
                  fontSize="xl"
                >
                  <MDXRemote {...page.subtitle.mdx} />
                </Container>
              )}
            </Box>
          </Box>
        </>
      )}

      <div>
        {children}
        {pageNewsletter && <Personalize {...pageNewsletter} component={Marketing.NewsletterSignup} />}
      </div>
    </>
  )
}

export const getLayout = (page) => {
  return getSiteLayout(<PageLayout {...page.props}>{page}</PageLayout>)
}
