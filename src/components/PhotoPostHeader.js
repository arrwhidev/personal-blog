import React from 'react'
import Bio from './Bio'
import Img from 'gatsby-image'
import { rhythm, scale } from '../utils/typography'
import ArrowIcon from '!svg-react-loader!../../static/svg/arrow.svg?name=ArrowIcon'

export default class Header extends React.Component {
  imageContainer() {
    return (
      <div
        className="image-container"
        style={{
          display: 'block',
          top: '0px',
          left: '0px',
          width: '100%',
          height: `100vh`,
          position: 'absolute',
        }}
      >
        <Img
          fluid={this.props.heroImage}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: `100vh`,
            filter: 'brightness(50%)',
          }}
        />
      </div>
    )
  }

  textContainer() {
    return (
      <div
        className="text-container"
        style={{
          display: 'block',
          position: 'relative',
          textAlign: 'center',
          marginLeft: '0px',
          marginRight: '0px',
          width: '100%',
          height: '85vh',
          zIndex: 5,
          color: 'white',
          paddingTop: '25vh',
        }}
      >
        <h1 style={{ fontSize: '3.5rem' }}>{this.props.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
            fontSize: '1rem',
          }}
        >
          {this.props.date}
        </p>
      </div>
    )
  }

  bioContainer() {
    return (
      <div
        className="bio-container"
        style={{
          display: 'block',
          position: 'relative',
          textAlign: 'center',
          marginLeft: '0px',
          marginRight: '0px',
          width: '100%',
          height: '15vh',
          zIndex: 5,
          color: 'white',
        }}
      >
        <Bio isPhoto />
      </div>
    )
  }

  backToHome() {
    return (
      <div
        className="back"
        style={{
          position: 'absolute',
          top: 50,
          left: 50,
          width: '40px',
          height: '40px',
          zIndex: 10,
          transform: 'scaleX(-1)',
        }}
      >
        <a href="/" style={{ boxShadow: 'none' }}>
          <ArrowIcon
            style={{
              width: '100%',
              height: '100%',
              filter: 'invert(100%)',
            }}
          />
        </a>
      </div>
    )
  }

  render() {
    return (
      <header
        style={{
          width: '100%',
          height: `100vh`,
          overflow: 'hidden',
          margin: 0,
          marginBottom: '80px',
        }}
      >
        {this.backToHome()}
        <div
          className="flex"
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: `100vh`,
            zIndex: 0,
            flexDirection: 'column',
          }}
        >
          {this.imageContainer()}
          {this.textContainer()}
          {this.bioContainer()}
        </div>
      </header>
    )
  }
}
