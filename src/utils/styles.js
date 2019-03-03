import { css } from 'styled-components'

const SIZES = [
  { type: 'giant', size: 3000 },
  { type: 'desktop', size: 1300 },
  { type: 'tablet', size: 768 },
  { type: 'phone', size: 376 },
]

const toEm = t => SIZES.find(({ type }) => type === t).size / 16

const calculateMinWidth = index => {
  if (SIZES[index + 1]) {
    return toEm(SIZES[index + 1].type)
  }
  return 0
}

export const media = SIZES.reduce((acc, { type }, i) => {
  return {
    ...acc,
    [type]: (...args) => css`
      @media (min-width: ${calculateMinWidth(i)}em) and (max-width: ${toEm(
          type
        )}em) {
        ${css(...args)};
      }
    `,
  }
}, {})
