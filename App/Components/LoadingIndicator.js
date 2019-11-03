import React, { Component } from 'react'
import LottieView from 'lottie-react-native';
import { View } from 'react-native'
import { Colors } from '../Themes'


export default class LoadingIndicator extends Component {

    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.dark }}>
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    loop={true}
                    source={require('../Assets/Animations/space-cat.json')}
                />
            </View>
        )
    }
}
