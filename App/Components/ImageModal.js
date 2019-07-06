import React, { Component } from 'react'
import { View, StyleSheet, Animated, Easing, ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Metrics, Colors, ApplicationStyles } from '../Themes'
import { Title, Text } from '../Components/Typography'
import { PropTypes } from 'react'

const DURATION = 500
const BEZIER = Easing.bezier(.95, .09, .34, .93)

const animationConfig = {
    duration: DURATION,
    easing: BEZIER
}

const Container = styled.View`
    ${ApplicationStyles.screen.absoluteFillObject};
    ${ApplicationStyles.shadows.darkShadow};
`

const Image = styled.Image`
    width: 100%;
    height: 300;
    border-top-left-radius: 20;
    border-top-right-radius: 20;

`

export default class ImageModal extends Component {
    constructor(props) {
        super(props)
        const { x, y, width, height } = this.props.position
        this.state = {
            backgroundColor: Colors.clear
        }
        this.translateX = new Animated.Value(x)
        this.translateY = new Animated.Value(y)
        this.width = new Animated.Value(width)
        this.height = new Animated.Value(height)

    }

    animation = (x, y, width, height) => {
        return Animated.parallel([
            Animated.timing(this.translateX, {
                toValue: x,
                ...animationConfig
            }),
            Animated.timing(this.translateY, {
                toValue: y,
                ...animationConfig
            }),
            Animated.timing(this.width, {
                toValue: width,
                ...animationConfig,
            }),
            Animated.timing(this.height, {
                toValue: height,
                ...animationConfig,
            })
        ])
    }

    componentDidMount() {
        this.animation(0, 0, Metrics.screenWidth, Metrics.screenHeight).start(() => {
            this.setState({
                backgroundColor: Colors.white
            })
        })
    }

    render() {
        const { translateX, translateY, width, height } = this
        const { image, position } = this.props
        const style = {
            ...StyleSheet.absoluteFillObject,
            overflow: 'hidden',
            borderRadius: 20,
            width,
            height,
            transform: [
                { translateX },
                { translateY }
            ]
        }
        console.log(style)
        return (
            <Container>
                <Animated.View {...{ style }} >
                    <View>
                        <Image source={image.source} />
                        <View style={{ backgroundColor: Colors.white }}>
                            <TouchableOpacity onPress={() => {
                                this.animation(position.x, position.y, position.width, position.height).start(() => {
                                    this.props.closeModal()
                                })
                            }}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                            <Title>Hello World</Title>
                            <Text>Lorem ipsum dolor</Text>
                        </View>
                    </View>
                </Animated.View>
            </Container>

        )
    }
}
