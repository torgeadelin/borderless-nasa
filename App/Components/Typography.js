import React from 'react';

import styled from 'styled-components/native'
import { Fonts, Colors } from '../Themes'
import { paddingMixin, marginMixin } from '../Themes/Mixins'

export const Title = styled.Text`
    ${Fonts.style.title};
    color: ${p => p.color ? p.color : Colors.dark};
    text-align: ${p => p.center ? 'center' : 'left'};
    ${paddingMixin};
    ${marginMixin};
`

export const Subtitle = styled.Text`
    ${Fonts.style.subtitle};
    color: ${p => p.color ? p.color : Colors.dark};
    text-align: ${p => p.center ? 'center' : 'left'};
    ${paddingMixin};
    ${marginMixin};
`

export const Text = styled.Text`
    ${Fonts.style.text};
    color: ${p => p.color ? p.color : Colors.dark};
    text-align: ${p => p.center ? 'center' : 'left'};
    ${paddingMixin};
    ${marginMixin};
`