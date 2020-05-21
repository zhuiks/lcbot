/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useTranslation } from "react-i18next";

import metaImage from "../images/worship.jpg"

function SEO({ description, meta, title, songId }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            url
            author
          }
        }
      }
    `
  )

  const { t, i18n: { language } } = useTranslation()
  const metaTitle = title ? title : t('title')
  const metaDescription = description || t('description')
  const metaKeywords = t('metaKeywords')

  return (
    <Helmet
      htmlAttributes={{
        lang: language,
      }}
      title={metaTitle}
      titleTemplate={title ? `%s | ${t('title')}` : ''}
      meta={[
        // --- Primary Meta Tags
        {
          name: `description`,
          content: metaDescription,
        },
        // --- Open Graph / Facebook
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: site.siteMetadata.url + metaImage,
        },
        {
          property: `og:type`,
          content: songId ? `article` : `website`,
        },
        {
          property: `og:url`,
          content: site.siteMetadata.url + (songId ? `/${songId}` : '') + '/',
        },
        // --- Twitter
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: site.siteMetadata.url + metaImage,
        },
      ]
        .concat(
          metaKeywords.length > 0
            ? {
              name: `keywords`,
              content: metaKeywords,
            }
            : []
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  songId: PropTypes.string,
}

export default SEO
