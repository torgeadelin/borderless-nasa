import React, { Component } from 'react'
import { Image, View, StyleSheet, Animated, Easing, ScrollView, Text } from 'react-native'
import styled from 'styled-components/native'
import { Metrics, Colors } from '../Themes';

import { PanGestureHandler, State } from 'react-native-gesture-handler'

const DURATION = 600
const BEZIER = Easing.bezier(.95, .09, .34, .93)

const animationConfig = {
    duration: DURATION,
    easing: BEZIER
}

export default class ImageModal extends Component {
    constructor(props) {
        super(props)
        const { x, y, width, height } = this.props.position

        this.transform = new Animated.ValueXY({ x, y })
        this.width = new Animated.Value(width)
        this.height = new Animated.Value(height)
        this.velocityY = new Animated.Value(0)
        this.gestureState = new Animated.Value(State.UNDETERMINED)

        this.onGestureEvent = Animated.event(
            [
                {
                    nativeEvent: {
                        translationX: this.transform.x,
                        translationY: this.transform.y,
                        velocityY: this.velocityY,
                        state: this.gestureState,
                    }
                }
            ], {
            }
        )
    }

    animation = () => {
        return Animated.parallel([
            Animated.timing(this.transform, {
                toValue: { x: 0, y: 0 },
                ...animationConfig
            }),
            Animated.timing(this.width, {
                toValue: Metrics.screenWidth,
                ...animationConfig,
            }),
            Animated.timing(this.height, {
                toValue: Metrics.screenHeight,
                ...animationConfig,
            })
        ])
    }

    componentDidMount() {
        this.animation().start()
    }

    render() {
        const { transform, width, height, onGestureEvent, gestureState } = this
        const { image } = this.props
        const style = {
            ...StyleSheet.absoluteFillObject,
            width,
            height,
            transform: transform.getTranslateTransform()
        }
        return (
            <View style={styles.container}>
                <PanGestureHandler
                    {...{ onGestureEvent }}
                >
                    <Animated.View {...{ style }}>
                        <View style={styles.image}>
                            <Image style={{ width: '100%', height: 600 }} source={image.source} />
                            <Text>Hello World</Text>
                        </View>
                    </Animated.View>
                </PanGestureHandler>

            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,

    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
        borderRadius: 20,
    }
})
