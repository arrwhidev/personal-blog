import React from 'react'
import styled from 'styled-components'

export default ({ text, onClick }) => {
  const StyledButton = styled.button`
    font-weight: 500;
    font-size: 0.875rem;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    display: inline-block;
    height: 2.25rem;
    padding: 0 1.625rem;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;
    line-height: 2.25rem;
    vertical-align: middle;
    white-space: nowrap;
    user-select: none;
    position: relative;
    color: #fff;
    overflow: hidden;
    margin-bottom: 25px;

    :hover {
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.42), 0 2px 2px rgba(0, 0, 0, 0.2);
    }
  `

  return (
    <div className="main-content">
      <StyledButton onClick={onClick}>{text}</StyledButton>
    </div>
  )
}
