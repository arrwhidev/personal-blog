import React from 'react'
import { Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'
import styled from 'styled-components'
import { media } from '../utils/styles';
import Footer from './Footer'
import SEO from './seo'

export default class GenericLayout extends React.Component {
  render() {
    const { title, children, isPhoto, header, seoTitle, seoDescription = '', seoKeywords = [] } = this.props


    // if (location.pathname === rootPath) {
    //   header = (
    //     <h1
    //       style={{
    //         ...scale(1.5),
    //         marginBottom: rhythm(1.5),
    //         marginTop: 0,
    //       }}
    //     >
    //       <Link
    //         style={{
    //           boxShadow: `none`,
    //           textDecoration: `none`,
    //           color: `inherit`,
    //         }}
    //         to={`/`}
    //       >
    //         {title}
    //       </Link>
    //     </h1>
    //   )
    // } else {
    //   header = isPhoto ? null : (
    //     <h3
    //       style={{
    //         fontFamily: `Montserrat, sans-serif`,
    //         marginTop: 0,
    //         marginBottom: rhythm(-1),
    //       }}
    //     >
    //       <Link
    //         style={{
    //           boxShadow: `none`,
    //           textDecoration: `none`,
    //           color: `inherit`,
    //         }}
    //         to={`/`}
    //       >
    //         {title}
    //       </Link>
    //     </h3>
    //   )
    // }

    const Wrapper = isPhoto ? this.photoLayoutWrapper() : this.normalLayoutWrapper()

    // <SEO
    //       title="All posts"
    //       keywords={[`blog`, `gatsby`, `javascript`, `react`]}
    //     />

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
        < hr />
        <Footer />
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