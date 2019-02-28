import React from 'react'
import { Helmet } from 'react-helmet'

const CANVAS_SCRIPT_SRC =
  'https://cdn.jsdelivr.net/gh/arrwhidev/canvas-game-loop@RELEASE/v1.0/canvas.js'
const ASTEROIDS_SCRIPT_SRC =
  'https://cdn.jsdelivr.net/gh/arrwhidev/asteroids@RELEASE/v0.2/dist/bundle.js'

export default class Asteroids extends React.Component {
  constructor(props) {
    super(props)

    // Prevent browser scroll when pressing spacebar.
    window.addEventListener('keydown', function(e) {
        if(e.keyCode == 32) {
          e.preventDefault();
        }
    });

    const updateCanvasSize = () => {
        const { w, h } = this.getCanvasDimensions();
        const canvas = document.getElementById('canvas');
        canvas.width = w
        canvas.height = h
    }

    // Ensure that the canvas dimensions are updated when window is resized.
    window.addEventListener('resize', updateCanvasSize, false);
  }

  handleScriptInject = (_, { scriptTags }) => {
    if (scriptTags) {
      scriptTags.forEach(s => {
                const { id } = s;
                s.onload = this.handleOnLoad.bind(this, id)
            });
        }
  }

  handleOnLoad = (id, e) => {
      console.log('handleOnLoad', id)
  }

  getCanvasDimensions = () => {
    const w = window.innerWidth * 0.8
    const h = w / (16/9)
    return { w, h }
  }

  render() {
    const { w, h } = this.getCanvasDimensions();

    return (
      <div className="application" style={{
        margin: '0 auto',
        width: '99vw',
        display: 'flex',
        justifyContent: 'center'
    }}>
        <Helmet
          script={[
              { src: CANVAS_SCRIPT_SRC, id: 'canvas_script' },
              { src: ASTEROIDS_SCRIPT_SRC, id: 'asteroids_script' }
          ]}
          onChangeClientState={this.handleScriptInject}
        />
        <canvas
          id="canvas"
          width={w}
          height={h}
        />
      </div>
    )
  }
}
