import React, { Component } from 'react'
import { Text, SafeAreaView, View } from 'react-native'
import { ApplicationStyles } from '../Themes'
export default class Home extends Component {
    render() {
        return (
            <SafeAreaView
                style={[
                    ApplicationStyles.screen.mainContainer,
                    { backgroundColor: '#E5E6E6' },
                ]}
            >
                <View style={ApplicationStyles.screen.container}>
                    <Text>Hello</Text>
                </View>
            </SafeAreaView>
        )
    }
}
