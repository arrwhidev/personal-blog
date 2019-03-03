import React from 'react'
import { Helmet } from 'react-helmet'

const SCRIPT_SRC =
  'https://cdn.jsdelivr.net/gh/arrwhidev/cellular-automata@ec6c569b70f4e83e008c56535ab64a9a98d0bcaa/wolfram.js'

export default class CellularAutomata extends React.Component {
  constructor(props) {
    super(props)
  }

  handleScriptInject = (_, { scriptTags }) => {
    if (scriptTags) {
      const scriptTag = scriptTags[0]
      scriptTag.onload = this.handleOnLoad
    }
  }

  handleOnLoad = e => {
    this.w = wolfram('canvas-cellular-automata', '#00bcd4')
  }

  render() {
    if (this.w && this.props.isRandom) {
      this.w.toggleRandom()
    }

    return (
      <div className="canvas-wrapper">
        <Helmet
          script={[{ src: SCRIPT_SRC }]}
          onChangeClientState={this.handleScriptInject}
        />
        <div className="canvas-container">
          <canvas
            id="canvas-cellular-automata"
            width="800"
            height="320"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    )
  }
}
