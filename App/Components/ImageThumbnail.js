import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Metrics, ApplicationStyles } from '../Themes';
import { TouchableWithoutFeedback } from 'react-native'


const Thumbnail = styled.Image`
    width: 100%;
    height: ${Metrics.screenWidth * 0.6};
    resize-mode: cover;
    border-radius: 20;
    margin-bottom: 15;
    ${ApplicationStyles.shadows.lightShadow};
`

export default class ImageThumbnail extends Component {

    thumbnail = React.createRef()

    measure = () => new Promise(resolve => this.thumbnail.current.measureInWindow((x, y, width, height) =>
        resolve({ x, y, width, height })
    ))

    render() {
        const { image, onPress } = this.props
        return (
            <TouchableWithoutFeedback {...{ onPress }}>
                <Thumbnail ref={this.thumbnail} source={image.source} />
            </TouchableWithoutFeedback>
        )
    }
}
