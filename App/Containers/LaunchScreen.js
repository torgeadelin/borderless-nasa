import React, { Component } from 'react'
import { View, Image, Animated, Easing } from 'react-native'
import images from '../Themes/Images'
import { Title, Subtitle, Text } from '../Components/Typography'
import { ApplicationStyles, Colors, Metrics } from '../Themes'
import styled from 'styled-components/native'
import { WhiteSpace } from '../Components/Layout'
import { isIphoneX } from '../Utils/iPhoneX'
const Wrapper = styled.View`
  flex: 1;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${Metrics.doubleBaseMargin + 'px'};
`

const Spaceman = styled(Animated.Image)`
  width: ${isIphoneX() ? '120%' : '100%'};
  resizeMode: contain;
  position: absolute;
  /* bottom: ${isIphoneX() ? '-100px' : '-130'}; */
`

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      animatedPosition: new Animated.Value(isIphoneX() ? -100 : -130)
    }
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.animatedPosition, {
          toValue: isIphoneX() ? -90 : -120,
          duration: 1300,
        }),
        Animated.timing(this.state.animatedPosition, {
          toValue: isIphoneX() ? -100 : -130,
          duration: 1300,
        })
      ])
    ).start()
  }

  render() {
    return (
      <View style={ApplicationStyles.screen.mainContainer}>
        <View style={ApplicationStyles.screen.container}>
          <Wrapper>
            <Image style={ApplicationStyles.screen.backgroundImage} source={images.spacedust} />
            <Title color={Colors.white} center>Borderless</Title>
            <Subtitle mt={Metrics.space.sm} center>Explore the NASA</Subtitle>
            <Text mt={Metrics.space.xxl} color={Colors.white} center>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s </Text>
            <WhiteSpace size="xxl" />
            <Spaceman style={{bottom: this.state.animatedPosition}} source={images.spaceman} />
          </Wrapper>
        </View>
      </View>
    )
  }
}


