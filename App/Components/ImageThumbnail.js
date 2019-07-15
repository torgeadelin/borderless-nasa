import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Metrics, ApplicationStyles, Colors } from '../Themes'
import { TouchableWithoutFeedback, View, Animated } from 'react-native'
import { Title, Text, Subtitle } from '../Components/Typography'
import { Flex } from './Layout';
import { BlackGradient } from '../Themes/Gradients'
import { BEZIER } from '../Utils/Animations'

const Thumbnail = styled.ImageBackground`
    height: 100%;
    width: 100%;    
  
`

const Container = styled.View`
    border-radius: ${Metrics.radius};
    margin-bottom: ${Metrics.radius};
    background: ${Colors.white};
    height: ${Metrics.screenWidth * 0.6};
    overflow: hidden;
`

const Wrapper = styled(Animated.View)`
    position: relative;
    flex: 1;
    justify-content: flex-end;
`

const Footer = styled(BlackGradient)`
    width: 100%;
    padding: ${Metrics.space.lg}px ${Metrics.space.xl}px;
    border-bottom-left-radius: ${Metrics.radius};
    border-bottom-right-radius: ${Metrics.radius};
`


export default class ImageThumbnail extends Component {

    thumbnail = React.createRef()

    measure = () => new Promise(resolve => this.thumbnail.current.measureInWindow((x, y, width, height) =>
        resolve({ x, y, width, height })
    ))

    position = new Animated.Value(0)

    outAnimation = () =>
        Animated.timing(this.position, {
            toValue: 1,
            duration: 500,
            easing: BEZIER,
        })


    customOnPress = () => {
        //Animation goes here
        this.outAnimation().start(() => {
            this.props.onPress()
        })
    }

    render() {
        const { image, onPress } = this.props
        return (
            <TouchableWithoutFeedback onPress={this.customOnPress}>
                <Container ref={this.thumbnail}>
                    {!this.props.selected && this.position.setValue(0)}
                    {!this.props.selected && <Thumbnail imageStyle={{ borderRadius: Metrics.radius }} source={image.source}>
                        <Wrapper style={{
                            top: this.position.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 60]
                            })
                        }}>
                            <Footer>
                                <Subtitle style={{
                                    top: this.position.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 75]
                                    })
                                }} bold color={Colors.white}>Hello World</Subtitle>
                                <Text style={{
                                    top: this.position.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 100]
                                    })
                                }} mt={-5} color={Colors.white}>Subtitle is here</Text>
                            </Footer>
                        </Wrapper>
                    </Thumbnail>}
                </Container>
            </TouchableWithoutFeedback >
        )
    }
}
