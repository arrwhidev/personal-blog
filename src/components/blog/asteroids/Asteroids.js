import React from 'react'
import { Helmet } from 'react-helmet'

const CANVAS_SCRIPT_SRC =
  'https://cdn.jsdelivr.net/gh/arrwhidev/canvas-game-loop@RELEASE/v1.0/canvas.js'
const ASTEROIDS_SCRIPT_SRC =
  'https://cdn.jsdelivr.net/gh/arrwhidev/asteroids@RELEASE/v0.12/dist/bundle.js'

export default class Asteroids extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scripts: [],
    }
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
      const canvas = document.getElementById('asteroids-canvas')
      canvas.width = w
      canvas.height = h
    }

    // Ensure that the canvas dimensions are updated when window is resized.
    window.addEventListener('resize', this.updateCanvasSize, false)
    this.updateCanvasSize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateCanvasSize)
    window.killAsteroids()
  }

  handleScriptInject = (_, { scriptTags }) => {
    if (scriptTags) {
      scriptTags.forEach(s => {
        const { id } = s
        s.onload = this.handleOnLoad.bind(this, id)
      })
    }
  }

  handleOnLoad = (id, e) => {
    this.setState({
      scripts: [...this.state.scripts, id],
    })

    if (this.state.scripts.length === 2) {
      window.startAsteroids()
    }
  }

  getCanvasDimensions = () => {
    let w = 800,
      h = 800
    try {
      w = window.innerWidth - 15
      h = window.innerHeight
    } catch (e) {}
    return { w, h }
  }

  render() {
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
            { src: CANVAS_SCRIPT_SRC, id: 'canvas_script' },
            { src: ASTEROIDS_SCRIPT_SRC, id: 'asteroids_script' },
          ]}
          onChangeClientState={this.handleScriptInject}
        />
        <canvas id="asteroids-canvas" />
      </div>
    )
  }
}
