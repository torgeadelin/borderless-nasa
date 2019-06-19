import React, { Component } from 'react'
import { View, Image } from 'react-native'
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

const Spaceman = styled.Image`
  width: ${isIphoneX() ? '120%' : '100%'};
  resizeMode: contain;
  position: absolute;
  bottom: ${isIphoneX() ? '-100px' : '-130'};
`

export default class LaunchScreen extends Component {
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
            <Spaceman source={images.spaceman} />
          </Wrapper>
        </View>
      </View>
    )
  }
}
