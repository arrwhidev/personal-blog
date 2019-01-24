import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { media } from '../utils/styles';
import { StaticQuery, graphql } from "gatsby"

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

/**
 export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <Header data={data} {...props} />}
  />
) 
*/

/**
 query($slug: String!, $absolutePathRegex: String!) {
                site {
                  siteMetadata {
                    title
                    author
                  }
                }
                images: allFile(
                  filter: {
                    absolutePath: { regex: $absolutePathRegex }
                    extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
                  }
                  sort: { fields: name, order: ASC }
                ) {
                  edges {
                    node {
                      childImageSharp {
                        fluid(maxWidth: 1600, quality: 90) {
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  }
                }
                mdx(fields: { slug: { eq: $slug } }) {
                  id
                  excerpt(pruneLength: 160)
                  frontmatter {
                    title
                    date(formatString: "MMMM DD, YYYY")
                  }
                }
              }
 */

export default class Grid extends React.Component {
    render() {
        return <StaticQuery
            query={graphql`
            query {
                site {
                  siteMetadata {
                    title
                  }
                }
                images: allFile(
                        filter: {
                        absolutePath: { regex: $absolutePathRegex }
                        extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
                        }
                        sort: { fields: name, order: ASC }
                    ) {
                        edges {
                        node {
                            childImageSharp {
                            fluid(maxWidth: 1600, quality: 90) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                            }
                        }
                        }
                    }
              }
            `}
            render={data => {
                console.log(data, this.props)
                return <p>I AM THE GRID</p>
            }}
        />

        // console.log('****', this.props);

        // const { images, manifest } = this.props;

        // const renderImage = (image, size) => {
        //     const StyledImage = IMAGE_COMPONENTS[size];
        //     return (<StyledImage
        //         key={image.node.childImageSharp.fluid.src}
        //         fluid={image.node.childImageSharp.fluid}
        //     />)
        // }

        // const content = manifest.images.map(({name, type}) => {
        //     const img = images.find(({node}) => node.childImageSharp.fluid.src.endsWith(name));
        //     return renderImage(img, type)
        // })

        // return (
        //     <GridLayout>{ content } </GridLayout>
        // )
    }     
}

// export const gridQuery = graphql`
//   query($slug: String!, $absolutePathRegex: String!) {
//     site {
//       siteMetadata {
//         title
//         author
//       }
//     }
//     images: allFile(
//       filter: {
//         absolutePath: { regex: $absolutePathRegex }
//         extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
//       }
//       sort: { fields: name, order: ASC }
//     ) {
//       edges {
//         node {
//           childImageSharp {
//             fluid(maxWidth: 1600, quality: 90) {
//               ...GatsbyImageSharpFluid_withWebp
//             }
//           }
//         }
//       }
//     }
//     mdx(fields: { slug: { eq: $slug } }) {
//       id
//       excerpt(pruneLength: 160)
//       frontmatter {
//         title
//         date(formatString: "MMMM DD, YYYY")
//       }
//     }
//   }
// `
