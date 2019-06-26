import React, { Component } from 'react'
import { Text, SafeAreaView, View } from 'react-native'
import { ApplicationStyles } from '../Themes';
export default class Home extends Component {
    render() {
        return (
            <SafeAreaView style={ApplicationStyles.screen.mainContainer}>
                <View style={ApplicationStyles.screen.container}>
                    <Text>Hello</Text>
                </View>
            </SafeAreaView>
        )
    }
}
