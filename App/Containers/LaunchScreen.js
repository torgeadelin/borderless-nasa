import React, { Component } from 'react'
import { View, Image, Animated, Easing, TouchableOpacity } from 'react-native'
import images from '../Themes/Images'
import { Title, Subtitle, Text } from '../Components/Typography'
import { ApplicationStyles, Colors, Metrics, Images } from '../Themes'
import { Button } from '../Components/Button'
import styled from 'styled-components/native'
import { WhiteSpace } from '../Components/Layout'
import { isIphoneX } from '../Utils/iPhoneX'
import Icon from 'react-native-vector-icons/Feather'

const Wrapper = styled.View`
    flex: 1;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: ${Metrics.doubleBaseMargin + 'px'};
`

const Spaceman = styled(Animated.Image)`
    resizemode: contain;
    position: absolute;
    width: ${isIphoneX() ? '120%' : '95%'};
`

const Logo = styled(Animated.Image)`
    width: 150;
    height: 150;
    margin-top: -50;
    margin-bottom: ${Metrics.space.lg};
`

const BOTTOM_ANIMATED_INITIAL = isIphoneX() ? -130 : -170
const BOTTOM_ANIMATED_FINAL = isIphoneX() ? -120 : -160

const FLOAT_ANIMATION_DURATION = 1500

const floatAnimation = value =>
    Animated.loop(
        Animated.sequence([
            Animated.timing(value, {
                toValue: 1,
                duration: FLOAT_ANIMATION_DURATION,
            }),
            Animated.timing(value, {
                toValue: 0,
                duration: FLOAT_ANIMATION_DURATION,
            }),
        ])
    )

const outAnimation = value =>
    Animated.timing(value, {
        toValue: 1,
        duration: 1400,
        easing: Easing.bezier(0.71, 0.3, 0.41, 0.92),
    })

const imageOutAnimation = value =>
    Animated.timing(value, {
        toValue: { x: 0, y: Metrics.screenWidth / 2 },
        delay: 300,
        duration: 1300,
        easing: Easing.bezier(0.71, 0.3, 0.41, 0.92),
    })

export default class LaunchScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            floating: new Animated.Value(0),
            textAndButtonFadeOut: new Animated.Value(0),
            spacemanFadeOut: new Animated.ValueXY({ x: 0, y: 0 }),
        }
    }

    componentDidMount() {
        floatAnimation(this.state.floating).start()
    }

    fadeEffect = delay => {
        return {
            top: this.state.textAndButtonFadeOut.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -Metrics.screenWidth / (3 + delay)],
            }),
            opacity: this.state.textAndButtonFadeOut.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
            }),
        }
    }

    render() {
        return (
            <View style={ApplicationStyles.screen.mainContainer}>
                <View style={ApplicationStyles.screen.containerWithoutPadding}>
                    <Wrapper>
                        <Image
                            style={ApplicationStyles.screen.backgroundImage}
                            source={images.spacedust}
                        />
                        <Logo
                            source={Images.logo}
                            style={this.fadeEffect(1)}
                            resizeMode="contain"
                        />
                        <Title
                            style={this.fadeEffect(2)}
                            color={Colors.dark}
                            center
                        >
                            Borderless
                        </Title>
                        <Subtitle
                            mb={Metrics.space.xl}
                            style={this.fadeEffect(3)}
                            center
                        >
                            Explore NASA
                        </Subtitle>
                        <Button
                            style={this.fadeEffect(4)}
                            onPress={() => {
                                outAnimation(
                                    this.state.textAndButtonFadeOut
                                ).start(() => {
                                    floatAnimation(this.state.floating).stop()
                                    this.props.navigation.navigate('Main')
                                })
                                imageOutAnimation(
                                    this.state.spacemanFadeOut
                                ).start()
                            }}
                        >
                            Continue
                        </Button>
                        <WhiteSpace size="xxl" />
                        <Spaceman
                            style={{
                                bottom: this.state.floating.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [
                                        BOTTOM_ANIMATED_INITIAL,
                                        BOTTOM_ANIMATED_FINAL,
                                    ],
                                }),
                                transform: this.state.spacemanFadeOut.getTranslateTransform(),
                                opacity: this.state.textAndButtonFadeOut.interpolate(
                                    {
                                        inputRange: [0, 1],
                                        outputRange: [1, 0],
                                    }
                                ),
                            }}
                            source={images.spaceman}
                        />
                    </Wrapper>
                </View>
            </View>
        )
    }
}
