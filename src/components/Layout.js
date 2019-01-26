import React from 'react'
import { Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'
import styled from 'styled-components'
import { media } from '../utils/styles';
import Footer from './Footer'
import SEO from './seo'

export default class GenericLayout extends React.Component {
  render() {
    const { title, children, isIndex, isPhoto, header, seoTitle, seoDescription = '', seoKeywords = [] } = this.props
    const Wrapper = isPhoto ? this.photoLayoutWrapper() : this.normalLayoutWrapper()

    return (
      <Wrapper>
        <header>
            <SEO
              title={seoTitle || title}
              description={seoDescription}
              keywords={seoKeywords}
            />
            {header}
        </header>
        {children}
        <Footer/>
      </Wrapper>
    )
  }

  photoLayoutWrapper() {
    return styled.div`
      margin-left: auto;
      margin-right: auto;
      padding: ${rhythm(1.5)} ${rhythm(3 / 4)};

      ${media.giant`
          max-width: ${rhythm(48)};
      `}
      ${media.desktop`
          max-width: ${rhythm(28)};
      `}
      ${media.tablet`
          max-width: ${rhythm(24)};
      `}
      ${media.phone`
          max-width: ${rhythm(24)};
      `}

      p {
        margin-left: auto;
        margin-right: auto;
        padding-left: ${rhythm(3 / 4)};
        padding-right: ${rhythm(3 / 4)};
        
        ${media.giant`
            max-width: ${rhythm(28)};
        `}
        ${media.desktop`
            max-width: ${rhythm(28)};
        `}
        ${media.tablet`
            max-width: ${rhythm(24)};
        `}
        ${media.phone`
            max-width: ${rhythm(24)};
        `}
      }
    `
  }

  normalLayoutWrapper() {
    return styled.div`
      margin-left: auto;
      margin-right: auto;
      padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
      max-width: ${rhythm(24)};
    `
  }
}