import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import TwitterIcon from '!svg-react-loader!../../static/svg/twitter.svg?name=TwitterIcon'
import GithubIcon from '!svg-react-loader!../../static/svg/github.svg?name=GithubIcon'

function Icon({ component }) {
  const StyledIcon = styled(component)`
    width: 22px;
  `
  return <StyledIcon />
}

function Anchor({ href, component }) {
  const StyledAnchor = styled.a`
    box-shadow: none;
    padding-right: 10px;

    :hover {
        box-shadow: none;
    }
  `

  return (
    <StyledAnchor href={href}>
      <Icon component={component} />
    </StyledAnchor>
  )
}

export default ({ className, isFull }) => {
  const StyledFooter = styled.footer`
    padding-top: 40px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  `

  const anchorStyles = {
      color: isFull? 'white' : 'inherit'
  }

  return (
    <StaticQuery
      query={footerQuery}
      render={data => {
        const { social } = data.site.siteMetadata
        return (
          <StyledFooter className={className}>
            <hr
              style={{ width: '33%', marginRight: 'auto', marginLeft: 'auto' }}
            />
            <Anchor
                style={anchorStyles}
              component={TwitterIcon}
              href={`https://twitter.com/${social.twitter}`}
            />
            {` `}
            <Anchor
                style={anchorStyles}
              component={GithubIcon}
              href={`https://github.com/${social.github}`}
            />
          </StyledFooter>
        )
      }}
    />
  )
}

const footerQuery = graphql`
  query SocialQuery {
    site {
      siteMetadata {
        social {
          twitter
          github
        }
      }
    }
  }
`
