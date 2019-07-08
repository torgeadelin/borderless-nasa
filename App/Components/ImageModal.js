import React, { Component } from 'react'
import { View, StyleSheet, Animated, Easing, ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Metrics, Colors, ApplicationStyles } from '../Themes'
import { Title, Text } from '../Components/Typography'
import { PropTypes } from 'react'

const DURATION = 1000
const BEZIER = Easing.bezier(.95, .09, .34, .93)

const animationConfig = {
    // duration: DURATION,
    // easing: BEZIER,
}

const Container = styled.View`
    ${ApplicationStyles.screen.absoluteFillObject};
    ${ApplicationStyles.shadows.darkShadow};
`

const Image = styled.Image`
    width: 100%;
    height: ${Metrics.screenWidth * 0.6};
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
        this.position = new Animated.ValueXY({ x: x, y: y })
        this.dimension = new Animated.ValueXY({ x: width, y: height })

    }

    animation = (x, y, width, height) => {
        return Animated.parallel([
            Animated.spring(this.position, {
                toValue: { x: x, y: y },
                ...animationConfig,
            }),
            Animated.spring(this.dimension, {
                toValue: { x: width, y: height },
                ...animationConfig,
            })
        ])
    }

    componentWillMount() {
        this.animation(0, 0, Metrics.screenWidth, Metrics.screenHeight).start(() => {
            this.setState({
                backgroundColor: Colors.white
            })
        })
    }

    render() {
        const { image, position } = this.props
        const style = {
            ...StyleSheet.absoluteFillObject,
            overflow: 'hidden',
            borderRadius: 15,
            width: this.dimension.x,
            height: this.dimension.y,
            transform: this.position.getTranslateTransform()
        }
        console.log(style)
        return (
            <Container>
                <Animated.View {...{ style }} >
                    <View>
                        {/* <Image source={image.source} /> */}
                        <ScrollView style={{ backgroundColor: Colors.white, padding: 20, height: '100%' }}>
                            <TouchableOpacity onPress={() => {
                                this.animation(position.x, position.y, position.width, position.height).start(() => {
                                    this.props.closeModal()
                                })
                            }}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                            <Title>Hello World</Title>
                            <Text>Lorem ipsum dolor</Text>
                        </ScrollView>
                    </View>
                </Animated.View>
            </Container>

        )
    }
}
