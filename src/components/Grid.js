import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { media } from '../utils/styles';

const GridLayout = styled.div`
    display: grid;
    grid-gap: 10px;
    padding: 10px;

    ${media.giant`
        grid-template-columns: repeat(6, 1fr);
    `}
    ${media.desktop`
        grid-template-columns: repeat(6, 1fr);
    `}
    ${media.tablet`
        grid-template-columns: 1fr;
    `}
    ${media.phone`
        grid-template-columns: 1fr;
    `}
`

const FullImage = styled(Img)`
    ${media.giant`
        grid-column: span 6;
    `}
    ${media.desktop`
        grid-column: span 6;
    `}
    ${media.tablet`
        grid-column: span 1;
    `}
    ${media.phone`
        grid-column: span 1;
    `}
`

const HalfImage = styled(Img)`
    ${media.giant`
        grid-column: span 3;
    `}
    ${media.desktop`
        grid-column: span 3;
    `}
    ${media.tablet`
        grid-column: span 1;
    `}
    ${media.phone`
        grid-column: span 1;
    `}
`

const ThirdImage = styled(Img)`
    ${media.giant`
        grid-column: span 2;
    `}
    ${media.desktop`
        grid-column: span 2;
    `}
    ${media.tablet`
        grid-column: span 1;
    `}
    ${media.phone`
        grid-column: span 1;
    `}
`

const IMAGE_COMPONENTS = {
    full: FullImage,
    half: HalfImage,
    third: ThirdImage,
}

export default class Grid extends React.Component {
    render() {
        const { images, manifest } = this.props;

        const renderImage = (image, size) => {
            const StyledImage = IMAGE_COMPONENTS[size];
            return (<StyledImage
                key={image.node.childImageSharp.fluid.src}
                fluid={image.node.childImageSharp.fluid}
            />)
        }

        const content = manifest.images.map(({name, type}) => {
            const img = images.find(({node}) => node.childImageSharp.fluid.src.endsWith(name));
            return renderImage(img, type)
        })

        return (
            <GridLayout>{ content } </GridLayout>
        )
    }     
}