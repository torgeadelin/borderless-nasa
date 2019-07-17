import React, { Component } from 'react'
import { View, StyleSheet, Easing, ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Metrics, Colors, ApplicationStyles } from '../Themes'
import { Title, Text } from '../Components/Typography'
import { PropTypes } from 'react'
import Animated from 'react-native-reanimated'
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { runTiming } from '../Utils/Animations'
import { isIphoneX } from '../Utils/iPhoneX'
import Icon from 'react-native-vector-icons/Feather'

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

const shadow = {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 1,
}

const Image = styled.Image`
    width: 100%;
    height: ${Metrics.screenWidth * 0.6};
   
`

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    top: ${isIphoneX() ? 40 : 30};
    right: 20px;
    background-color: ${Colors.dark};
    border-radius: 100;
    padding: 6px;
    z-index: 999;
    display: ${p => p.close ? 'none' : 'flex'};
    opacity: 0.7;
    
`

export default class ImageModal extends Component {
    constructor(props) {
        super(props)
        this.state = State.UNDETERMINED
        const { x, y, width, height } = this.props.position
        this.state = {
            backgroundColor: Colors.clear,
            closeButton: false,
        }

        //Animation Values
        this.velocityY = new Value(0)
        this.state = new Value(State.UNDETERMINED);
        this.opacity = new Value(.7)
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

    closeButton = () => {
        this.setState({
            closeButton: true
        })
    }

    render() {
        const { image, position } = this.props
        const { translateX, translateY, width, height, opacity } = this
        const style = {
            borderRadius: 15,
            width: width,
            height: height,
            overflow: 'hidden',
            transform: [{ translateX }, { translateY }]
        }
        return (
            <React.Fragment>
                <Animated.Code>
                    {
                        () => block([
                            cond(eq(this.state, State.UNDETERMINED), runTiming(this.translateX, 0)),
                            cond(eq(this.state, State.UNDETERMINED), runTiming(this.translateY, 0)),
                            cond(eq(this.state, State.UNDETERMINED), runTiming(this.width, Metrics.screenWidth)),
                            cond(eq(this.state, State.UNDETERMINED), runTiming(this.height, Metrics.screenHeight)),
                            cond(and(eq(this.state, State.END), lessOrEq(this.velocityY, 0)), [
                                runTiming(this.translateX, 0),
                                runTiming(this.translateY, 0),
                                runTiming(this.width, Metrics.screenWidth),
                                runTiming(this.height, Metrics.screenHeight),
                            ]),
                            cond(and(eq(this.state, State.END), greaterThan(this.velocityY, 0)), [
                                runTiming(this.translateX, position.x),
                                runTiming(this.translateY, position.y),
                                runTiming(this.width, position.width),
                                runTiming(this.height, position.height),
                                cond(eq(this.height, position.height), call([], this.props.closeModal)),
                            ]),
                        ])
                    }
                </Animated.Code>
                <View style={{ ...shadow, backgroundColor: Colors.dark }}>


                    <Animated.View {...{ style }} >
                        <View style={{
                            ...StyleSheet.absoluteFillObject,
                            width: null,
                            height: null,
                            borderRadius: 15,
                        }}>
                            <CloseButton close={this.state.closeButton} onPress={() => {
                                this.setState(
                                    { closeButton: true }
                                )
                                this.state.setValue(State.END)
                                this.velocityY.setValue(10)
                            }}>
                                <Icon
                                    name={'x'}
                                    size={20}
                                    color={Colors.white} />
                            </CloseButton>
                            <Image source={{ uri: image.links[0].href }} />

                            <ScrollView style={{ backgroundColor: Colors.dark, padding: 20, height: '100%' }}>
                                <Title color={Colors.white}>{image.data[0].title}</Title>
                                <Text color={Colors.white}>{image.data[0].secondary_creator}</Text>
                            </ScrollView>
                        </View>

                    </Animated.View>
                </View>
            </React.Fragment >

        )
    }
}
