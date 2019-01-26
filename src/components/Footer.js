import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import TwitterIcon from '!svg-react-loader!../../static/svg/twitter.svg?name=TwitterIcon'
import GithubIcon from '!svg-react-loader!../../static/svg/github.svg?name=GithubIcon'

function Icon({ component }) {
    const StyledIcon = styled(component)`
        width: 20px;
    `
    return <StyledIcon />
}

function Anchor({ href, component }) {
    const StyledAnchor = styled.a`
        box-shadow: none;
        padding-right: 10px;
    `;

    return (
        <StyledAnchor href={href}>
            <Icon component={component}/>
        </StyledAnchor>
    )
}

export default () => {
    return <StaticQuery
      query={footerQuery}
      render={data => {
        const { social } = data.site.siteMetadata
        return (
            <div>
                <Anchor component={TwitterIcon} href={`https://twitter.com/${social.twitter}`}/>
                {` `}
                <Anchor component={GithubIcon} href={`https://github.com/${social.github}`}/>
            </div>
        )
      }}
    />
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