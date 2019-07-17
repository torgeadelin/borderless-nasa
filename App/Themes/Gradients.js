import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const gradients = {
    black: ["#262934", "#343845"],
    red: ["#69142C", "#D12757"],
    transparentBlack: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"],

}
export const BlackGradient = (props) => (
    <LinearGradient {...props} colors={gradients.black} start={{ x: 0, y: 1 }} end={{ x: 0.7, y: 1 }}>
        {props.children}
    </LinearGradient>
)

export const RedGradient = (props) => (
    <LinearGradient {...props} colors={gradients.red} start={{ x: 0, y: 1 }} end={{ x: 0.7, y: 1 }}>
        {props.children}
    </LinearGradient>
)

export const OverlayGradient = (props) => (
    <LinearGradient {...props} colors={gradients.transparentBlack} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
        {props.children}
    </LinearGradient>
)

export default gradients