import React from 'react'
import styled from 'styled-components'
import { Animated, TouchableOpacity } from 'react-native'
import { Text } from '../Components/Typography'
import { Metrics, Colors } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'

const ButtonWrapper = styled(Animated.createAnimatedComponent(TouchableOpacity))`
    padding: ${Metrics.space.xl}px ${Metrics.space.xxl}px;
    background: ${p => (p.bg ? p.bg : Color.dark)};
    border-radius: 100;
    z-index: 999;
    font-weight: bold;
    ${p => p.fullWidth && 'width: 100%'};
`

export function Button(props) {
    return (

        <ButtonWrapper {...props}>
            <Text bold center color={Colors.white}>
                {props.children}
            </Text>
        </ButtonWrapper>

    )
}
