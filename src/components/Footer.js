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
    `;

    return (
        <StyledAnchor href={href}>
            <Icon component={component}/>
        </StyledAnchor>
    )
}

export default () => {
    const StyledFooter = styled.footer`
        padding-top: 40px;
        margin-left: auto;
        margin-right: auto;
        width: 33%;
        text-align: center;
    `

    return <StaticQuery
      query={footerQuery}
      render={data => {
        const { social } = data.site.siteMetadata
        return (
            <StyledFooter>
                <hr style={{ width: '100%' }}/>
                <Anchor component={TwitterIcon} href={`https://twitter.com/${social.twitter}`}/>
                {` `}
                <Anchor component={GithubIcon} href={`https://github.com/${social.github}`}/>
            </StyledFooter>
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