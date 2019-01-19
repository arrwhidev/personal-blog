import React from 'react'
import { Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'
import styled from 'styled-components'
import { media } from '../utils/styles';

class Layout extends React.Component {
  render() {
    const { location, title, children, isPhoto } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }

    const Wrapper = styled.div`
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

    return (
      <Wrapper>
        {header}
        {children}
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </Wrapper>
    )
  }
}

export default Layout
