import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes'
import gradients, { GenericGradient } from '../../Themes/Gradients';
import { Text } from '../Typography'
import { View, StatusBar, Platform, findNodeHandle } from 'react-native'

const offset = (v) => (Platform.OS === "android" ? (v + StatusBar.currentHeight) : v);

const Wrapper = styled(GenericGradient)`
    padding: ${Metrics.space.xl}px ${Metrics.space.xl * 2.5}px;
    background-color: ${Colors.dark};
    ${ApplicationStyles.shadows.redShadow};
    border-radius: ${Metrics.radius};
    margin-right: ${Metrics.doubleBaseMargin};
`

export default class Category extends Component {
    ref = React.createRef()

    measure = async (root) => new Promise(resolve => this.ref.current.measureLayout(findNodeHandle(root), (x, y, width, height) => resolve({
        x, y: offset(y), width, height,
    })));

    render() {
        const { ref } = this
        return (
            <View {...{ ref }}>
                <Wrapper {...this.props} colors={this.props.active ? gradients.red : gradients.black}>
                    <Text bold color={Colors.white}>{this.props.name}</Text>
                </Wrapper>
            </View>

        )
    }
}
