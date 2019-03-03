import React from 'react'
import styled from 'styled-components'
import { media } from '../utils/styles'

export default ({ children }) => {
  const StyledDiv = styled.div`
    ${media.giant`
    display: none;
    `}
    ${media.desktop`
display: none;
`}
  `

  return <StyledDiv className="main-content">{children}</StyledDiv>
}
