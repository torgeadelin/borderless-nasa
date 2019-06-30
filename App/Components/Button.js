import React from 'react'
import styled from 'styled-components'
import { Animated, TouchableOpacity } from 'react-native'
import { Text } from '../Components/Typography'
import { Metrics, Colors } from '../Themes'

const ButtonWrapper = styled(
    Animated.createAnimatedComponent(TouchableOpacity)
)`
    padding: ${Metrics.space.xl}px ${Metrics.space.xxl}px;
    background: ${Colors.dark};
    border-radius: 100;
    z-index: 999;
    ${p => p.fullWidth && 'width: 100%'};
`

export function Button(props) {
    return (
        <ButtonWrapper {...props}>
            <Text center color={Colors.white}>
                {props.children}
            </Text>
        </ButtonWrapper>
    )
}
