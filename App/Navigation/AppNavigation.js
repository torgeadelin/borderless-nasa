import { createStackNavigator, createAppContainer } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import TabNavigation from './TabNavigation'
import { fadeIn } from 'react-navigation-transitions'

// Manifest of possible screens
const AppNavigation = createStackNavigator(
    {
        Main: TabNavigation,
        LaunchScreen: {
            screen: LaunchScreen,
        },
    },
    {
        // Default config for all screens
        headerMode: 'none',
        initialRouteName: 'LaunchScreen',
        transitionConfig: () => fadeIn(),
    }
)

export default createAppContainer(AppNavigation)
