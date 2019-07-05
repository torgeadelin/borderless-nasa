import { createStackNavigator, createAppContainer } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import TabNavigation from './TabNavigation'
import { fadeIn } from 'react-navigation-transitions'

import HomeScreen from '../Containers/Home/HomeScreen'

// Manifest of possible screens
const AppNavigation = createStackNavigator(
    {
        Main: HomeScreen,
        LaunchScreen: {
            screen: LaunchScreen,
        },
    },
    {
        // Default config for all screens
        headerMode: 'none',
        initialRouteName: 'Main',
        transitionConfig: () => fadeIn(),
    }
)

export default createAppContainer(AppNavigation)
