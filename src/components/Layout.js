import React from 'react'
import { Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'
import styled from 'styled-components'
import { media } from '../utils/styles'
import Footer from './Footer'
import SEO from './seo'

export default class GenericLayout extends React.Component {
  render() {
    const {
      title,
      children,
      isPhoto,
      isFull,
      header,
      seoTitle,
      seoDescription = '',
      seoKeywords = [],
    } = this.props
    const Wrapper = isPhoto
      ? this.photoLayoutWrapper()
      : isFull
      ? this.fullLayoutWrapper()
      : this.normalLayoutWrapper()

    return (
      <Wrapper>
        <header className="main-content">
          <SEO
            title={seoTitle || title}
            description={seoDescription}
            keywords={seoKeywords}
          />
          {header}
        </header>
        {children}
        <Footer className="main-content" isFull />
      </Wrapper>
    )
  }

  photoLayoutWrapper() {
    return styled.div`
      padding-bottom: ${rhythm(1.5)};

      .main-content {
        margin-left: auto;
        margin-right: auto;
        padding-left: ${rhythm(3 / 4)};
        padding-right: ${rhythm(3 / 4)};
        max-width: ${rhythm(24)};
      }
    `
  }

  normalLayoutWrapper() {
    return styled.div`
      padding-top: ${rhythm(1.5)};
      padding-bottom: ${rhythm(1.5)};

      .main-content {
        margin-left: auto;
        margin-right: auto;
        padding-left: ${rhythm(3 / 4)};
        padding-right: ${rhythm(3 / 4)};
        max-width: ${rhythm(24)};
      }

      .canvas-wrapper {
        margin-left: auto;
        margin-right: auto;

        ${media.giant`
            max-width: ${rhythm(42)};
            padding-top: 30px;
            padding-bottom: 30px;
        `}
        ${media.desktop`
            max-width: ${rhythm(36)};
            padding-top: 30px;
            padding-bottom: 30px;
        `}
        ${media.tablet`
            max-width: ${rhythm(24)};
            padding-left: ${rhythm(3 / 4)};
            padding-right: ${rhythm(3 / 4)};
        `}
        ${media.phone`
            max-width: ${rhythm(24)};
            padding-left: ${rhythm(3 / 4)};
            padding-right: ${rhythm(3 / 4)};
        `}
      }
    `
  }

  fullLayoutWrapper() {
    return styled.div`
      margin-top: ${rhythm(1.5)};

      .main-content {
        ${media.giant`
            margin-left: ${rhythm(2.2)};
            max-width: ${rhythm(14)};
        `}
        ${media.desktop`
            margin-left: ${rhythm(2.2)};
            max-width: ${rhythm(14)};
        `}
        ${media.tablet`
            margin-left: auto;
            margin-right: auto;
            padding-left: ${rhythm(3 / 4)};
            padding-right: ${rhythm(3 / 4)};
            max-width: ${rhythm(24)};
        `}
        ${media.phone`
            margin-left: auto;
            margin-right: auto;
            padding-left: ${rhythm(3 / 4)};
            padding-right: ${rhythm(3 / 4)};
            max-width: ${rhythm(24)};
        `}
      }

      .application {
            ${media.tablet`
                display: none;
            `}
            ${media.phone`
                display: none;
            `}
      }
     
      ${media.desktop`
        p,
        h1,
        h2,
        li,
        a {
            color: white;
        }

        hr {
            filter: invert(100%);
                -webkit-filter: invert(100%);
        }

        footer {
            svg{
                filter: invert(100%);
                -webkit-filter: invert(100%);
            }
        }
      `}

      ${media.giant`
        p,
        h1,
        h2,
        li,
        a {
            color: white;
        }

        hr {
            filter: invert(100%);
                -webkit-filter: invert(100%);
        }

        footer {
            svg {
            filter: invert(100%);
            -webkit-filter: invert(100%);
            }
        }
      `}
    `
  }
}