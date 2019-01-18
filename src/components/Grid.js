import React from 'react'
import Img from 'gatsby-image'

export default
class Grid extends React.Component {
    render() {
        const { images } = this.props;
        return (
            <li>
                {
                    images.map(image => (
                        <Img
                            key={image.node.childImageSharp.fluid.src}
                            fluid={image.node.childImageSharp.fluid}
                            style={{ margin: '3rem 0' }}
                        />
                    ))
                }
            </li>
        )
    }
}