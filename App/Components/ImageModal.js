import React, { Component } from 'react'
import { View, StyleSheet, Easing, ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Metrics, Colors, ApplicationStyles } from '../Themes'
import { Title, Text } from '../Components/Typography'
import { PropTypes } from 'react'
import Animated from 'react-native-reanimated'
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { runSpring } from '../Utils/Animations'

const {
    divide,
    eq,
    greaterThan,
    set,
    cond,
    startClock,
    stopClock,
    clockRunning,
    block,
    spring,
    add,
    debug,
    Value,
    Clock,
    event,
    call,
    and,
    greaterOrEq,
    lessOrEq,
    interpolate,
} = Animated;


const DURATION = 1000
const BEZIER = Easing.bezier(.95, .09, .34, .93)

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

        //Animation Values
        this.velocityY = new Value(0)
        this.state = new Value(State.UNDETERMINED);
        this.opacity = new Value(1)
        this.translateX = new Value(x)
        this.translateY = new Value(y)
        this.width = new Value(width)
        this.height = new Value(height)
        this.animationState = new Value(0)

        //Drag Gesture on Card
        this.onGestureEvent = event([
            {
                nativeEvent: {
                    translationX: this.translateX,
                    translationY: this.translateY,
                    velocityY: this.velocityY,
                    state: this.state,
                },
            }, {
                useNativeDriver: true
            }
        ])

    }

    render() {
        const { image, position } = this.props
        const { translateX, translateY, width, height, opacity } = this
        const style = {
            ...StyleSheet.absoluteFillObject,
            overflow: 'hidden',
            opacity: opacity,
            borderRadius: 15,
            width: width,
            height: height,
            transform: [{ translateX }, { translateY }]
        }
        return (
            <Container>
                <PanGestureHandler
                    onHandlerStateChange={this.onGestureEvent}
                    onGestureEvent={this.onGestureEvent}>
                    <Animated.View {...{ style }} >
                        <Animated.Code>
                            {
                                () => block([
                                    cond(eq(this.state, State.UNDETERMINED), runSpring(this.translateX, 0)),
                                    cond(eq(this.state, State.UNDETERMINED), runSpring(this.translateY, 0)),
                                    cond(eq(this.state, State.UNDETERMINED), runSpring(this.width, Metrics.screenWidth)),
                                    cond(eq(this.state, State.UNDETERMINED), runSpring(this.height, Metrics.screenHeight)),
                                    cond(and(eq(this.state, State.END), lessOrEq(this.velocityY, 0)), [
                                        runSpring(this.translateX, 0),
                                        runSpring(this.translateY, 0),
                                        runSpring(this.width, Metrics.screenWidth),
                                        runSpring(this.height, Metrics.screenHeight),
                                    ]),
                                    cond(and(eq(this.state, State.END), greaterThan(this.velocityY, 0)), [
                                        runSpring(this.translateX, position.x),
                                        runSpring(this.translateY, position.y),
                                        runSpring(this.width, position.width),
                                        runSpring(this.height, position.height),
                                        cond(eq(this.height, position.height), call([], this.props.closeModal)),
                                    ]),
                                    cond(eq(this.state, State.ACTIVE), set(this.width, interpolate(this.translateY, {
                                        inputRange: [Metrics.screenHeight / 4, Metrics.screenHeight - position.height],
                                        outputRange: [Metrics.screenWidth, position.width],
                                    }))),
                                    cond(eq(this.state, State.ACTIVE), set(this.height, interpolate(this.translateY, {
                                        inputRange: [Metrics.screenHeight / 4, Metrics.screenHeight - position.height],
                                        outputRange: [Metrics.screenHeight, position.height],
                                    }))),

                                ])
                            }
                        </Animated.Code>
                        <View>
                            <Image source={image.source} />
                            <ScrollView style={{ backgroundColor: Colors.white, padding: 20, height: '100%' }}>
                                <Title>Hello World</Title>
                                <Text>Lorem ipsum dolor</Text>
                            </ScrollView>
                        </View>
                    </Animated.View>
                </PanGestureHandler>
            </Container>

        )
    }
}
