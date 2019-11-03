import styled from 'styled-components/native'
import { Fonts, Colors } from '../Themes'
import { paddingMixin, marginMixin } from '../Themes/Mixins'
import { Animated } from 'react-native'

export const Title = styled(Animated.Text)`
    ${Fonts.style.title};
    color: ${p => (p.color ? p.color : Colors.dark)};
    text-align: ${p => (p.center ? 'center' : 'left')};
    ${paddingMixin};
    ${marginMixin};
`

export const Subtitle = styled(Animated.Text)`
    ${Fonts.style.subtitle};
    color: ${p => (p.color ? p.color : Colors.dark)};
    text-align: ${p => (p.center ? 'center' : 'left')};
    font-weight: ${p => (p.bold == true ? 'bold' : 'normal')};
    ${paddingMixin};
    ${marginMixin};
`

export const Text = styled(Animated.Text)`
    ${Fonts.style.text};
    color: ${p => (p.color ? p.color : Colors.dark)};
    text-align: ${p => (p.center ? 'center' : 'left')};
    font-weight: ${p => (p.bold == true ? 'bold' : 'normal')};
    ${paddingMixin};
    ${marginMixin};
`
