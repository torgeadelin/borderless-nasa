import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Colors } from '../Themes'

export default class TabBarIcon extends React.Component {
    render() {
        return (
            <Icon
                name={this.props.name}
                size={this.props.size ? this.props.size : 24}
                color={
                    this.props.focused
                        ? Colors.tabBarSelected
                        : Colors.tabIconDefault
                }
            />
        )
    }
}
