import React, { Component } from 'react'
import { Text, SafeAreaView } from 'react-native'
import gradients from '../Themes/Gradients'
import colors from '../Themes/Colors'
import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient';


export default class LaunchScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{
        flex:1,
        backgroundColor: gradients.green
      }}>
       
        <LinearGradient style={{flex: 1}} colors={['#4c669f', '#3b5998', '#192f6a']}>
        <Text>Hello World!</Text>
        </LinearGradient>
      </SafeAreaView>
    )
  }
}
