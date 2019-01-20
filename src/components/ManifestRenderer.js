import React from 'react';
import Grid from '../components/Grid';

export default class ManifestRenderer extends React.Component {

    render() {
        const { images, manifest } = this.props;
        return manifest.content.map(item => {
            if (item.images) {
                return <Grid images={images} manifest={item} />
            } else {
                return <item.c>{item.value}</item.c>
            }
        })
    }
}