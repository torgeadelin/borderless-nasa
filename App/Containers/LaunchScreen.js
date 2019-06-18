import React, { Component } from 'react'
import { Text, SafeAreaView, View } from 'react-native'
import gradients from '../Themes/Gradients'
import LottieView from 'lottie-react-native';
import anim from '../Assets/Animations/ninja.json';
export default class LaunchScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: gradients.green,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,

      }}>
        <LottieView style={{ width: '80%' }} source={anim} autoPlay loop />
      </SafeAreaView>
    )
  }
}
