import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation'
import TabBarIcon from '../Components/TabBarIcon'
import { TabBar } from '../Components/TabBar'
import HomeScreen from '../Containers/HomeScreen'
import { Colors, Metrics } from '../Themes';

const HomeStack = createStackNavigator({
    Home: HomeScreen
})

const DiscoverStack = createStackNavigator({
    Discover: HomeScreen
})

const ImagesStack = createStackNavigator({
    Images: HomeScreen
})

const ProfileStack = createStackNavigator({
    Profile: HomeScreen
})

HomeStack.navigationOptions = {
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
}

DiscoverStack.navigationOptions = {
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="search" />,
}

ImagesStack.navigationOptions = {
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="image" />,
}

ProfileStack.navigationOptions = {
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" />,
}

export default TabNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
        Discover: DiscoverStack,
        Images: ImagesStack,
        Profile: ProfileStack,

    }, {
        tabBarOptions: {
            activeTintColor: Colors.tabBarSelected,
            inactiveTintColor: Colors.tabBarDefault,
        },
        tabBarComponent: props => <TabBar {...props} />,
    }
)
