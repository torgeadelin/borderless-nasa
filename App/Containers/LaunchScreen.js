import React, { Component } from 'react'
import { View, Image, Animated } from 'react-native'
import images from '../Themes/Images'
import { Title, Subtitle, Text } from '../Components/Typography'
import { ApplicationStyles, Colors, Metrics } from '../Themes'
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
  resizeMode: contain;
  position: absolute;
`

const BOTTOM_ANIMATED_INITIAL = isIphoneX() ? -100 : -130
const BOTTOM_ANIMATED_FINAL = isIphoneX() ? -90 : -120

const WIDTH_ANIMATED_INITIAL = isIphoneX() ? '120%' : '100%'
const WIDTH_ANIMATED_FINAL = isIphoneX() ? '119%' : '99%'

const FLOAT_ANIMATION_DURATION = 1500

const floatAnimation = (value) => Animated.loop(
  Animated.sequence([
    Animated.timing(value, {
      toValue: 1,
      duration: FLOAT_ANIMATION_DURATION,
    }),
    Animated.timing(value, {
      toValue: 0,
      duration: FLOAT_ANIMATION_DURATION,
    })
  ])
)
export default class LaunchScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      animatedPosition: new Animated.Value(0),
    }
  }

  componentDidMount() {
    floatAnimation(this.state.animatedPosition).start()
  }

  render() {
    return (
      <View style={ApplicationStyles.screen.mainContainer}>
        <View style={ApplicationStyles.screen.container}>
          <Wrapper>
            <Image style={ApplicationStyles.screen.backgroundImage} source={images.spacedust} />
            <Title color={Colors.white} center>Borderless</Title>
            <Subtitle mt={Metrics.space.sm} center>Explore the NASA</Subtitle>
            <Icon name="home" size={25} color={Colors.dark} />
            <Text mt={Metrics.space.xxl} color={Colors.white} center>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s </Text>
            <WhiteSpace size="xxl" />
            <Spaceman
              style={{
                bottom: this.state.animatedPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [BOTTOM_ANIMATED_INITIAL, BOTTOM_ANIMATED_FINAL]
                }),
                width: this.state.animatedPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [WIDTH_ANIMATED_INITIAL, WIDTH_ANIMATED_FINAL]
                })
              }} source={images.spaceman} />
          </Wrapper>
        </View>
      </View>
    )
  }
}


