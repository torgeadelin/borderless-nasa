import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Metrics, ApplicationStyles, Colors } from '../Themes'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Title, Text, Subtitle } from '../Components/Typography'
import { Flex } from './Layout';
import LinearGradient from 'react-native-linear-gradient'

const Thumbnail = styled.ImageBackground`
    height: 100%;
    width: 100%;    
  
`

const Container = styled.View`
    ${ApplicationStyles.shadows.darkShadow};
    border-radius: 15;
    margin-bottom: 15;
    background: ${Colors.white};
    height: ${Metrics.screenWidth * 0.6};
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
                <Container ref={this.thumbnail}>

                    <Thumbnail imageStyle={{ borderRadius: 15 }} source={image.source}>
                        <Subtitle color={Colors.white}>Hello World</Subtitle>
                    </Thumbnail>

                </Container>
            </TouchableWithoutFeedback >
        )
    }
}
