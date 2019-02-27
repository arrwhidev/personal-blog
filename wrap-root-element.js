import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import { Code } from './src/components/code'
import { preToCodeBlock } from 'mdx-utils'

// components is its own object outside of render so that the references to
// components are stable
const components = {
  pre: preProps => {
    const props = preToCodeBlock(preProps)
    console.log(props)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    } else {
      // it's possible to have a pre without a code in it
      return <pre {...preProps} />
    }
  },
  p: props => <p className="main-content" {...props}></p>,
  h1: props => <h1 className="main-content" {...props}></h1>,
  h2: props => <h2 className="main-content" {...props}></h2>,
  h3: props => <h3 className="main-content" {...props}></h3>,
  button: props => <div className="main-content"><button {...props}></button></div>,
  blockquote: props => <blockquote className="main-content" {...props}></blockquote>,
}
export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
