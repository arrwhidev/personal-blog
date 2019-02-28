import React from 'react'
import { Helmet } from 'react-helmet'

const GUI_SCRIPTS_SRC = 
    'https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.4/dat.gui.min.js'
const PARTICLES_SCRIPT_SRC =
    'https://cdn.jsdelivr.net/gh/arrwhidev/particles@012053ad1e71574541e26b0ca1969edf9202a659/dist/bundle.js'

export default class Particles extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // Prevent browser scroll when pressing spacebar.
    window.addEventListener('keydown', function(e) {
      if (e.keyCode == 32) {
        e.preventDefault()
      }
    })

    this.updateCanvasSize = () => {
      const { w, h } = this.getCanvasDimensions()
      const canvas = document.getElementById('canvas')
      canvas.width = w
      canvas.height = h
    }

    // Ensure that the canvas dimensions are updated when window is resized.
    window.addEventListener('resize', this.updateCanvasSize, false)
  }

  handleScriptInject = (_, { scriptTags }) => {
    if (scriptTags) {
      scriptTags.forEach(s => {
        const { id } = s
        s.onload = this.handleOnLoad.bind(this, id)
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateCanvasSize)
}

  handleOnLoad = (id, e) => {
    console.log('handleOnLoad', id)
  }

  getCanvasDimensions = () => {
    let w = 800, h = 800
    try {
      w = window.innerWidth-15
      h = window.innerHeight
    } catch (e) {}
    return { w, h }
  }

  render() {
    const { w, h } = this.getCanvasDimensions()

    return (
      <div
        className="application"
        style={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: -1,
        }}
      >
        <Helmet
          script={[
            { src: GUI_SCRIPTS_SRC, id: 'gui_script' },
            { src: PARTICLES_SCRIPT_SRC, id: 'particles_script' }
          ]}
          onChangeClientState={this.handleScriptInject}
        />
        <canvas id="canvas" style={{ display: 'block', backgroundColor: 'white' }} width={w} height={h}></canvas>
      </div>
    )
  }
}
