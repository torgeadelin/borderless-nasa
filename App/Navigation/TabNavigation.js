import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation'
import TabBarIcon from '../Components/TabBarIcon'
import { TabBar } from 'react-native-animated-nav-tab-bar'
import HomeScreen from '../Containers/HomeScreen'
import { Colors } from '../Themes'
import colors from '../Themes/Colors'

const HomeStack = createStackNavigator({
    Home: HomeScreen,
})

const DiscoverStack = createStackNavigator({
    Discover: () => (
        <View style={{ flex: 1, backgroundColor: colors.gray }}>
            <Text>Discover</Text>
        </View>
    ),
})

const ImagesStack = createStackNavigator({
    Images: () => (
        <View style={{ flex: 1, backgroundColor: colors.gray }}>
            <Text>Images</Text>
        </View>
    ),
})

const ProfileStack = createStackNavigator({
    Profile: () => (
        <View style={{ flex: 1, backgroundColor: colors.gray }}>
            <Text>Profile</Text>
        </View>
    ),
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
        Profie: ProfileStack,
    },
    {
        tabBarOptions: {
            activeTintColor: Colors.tabBarSelected,
            inactiveTintColor: Colors.tabBarDefault,
        },
        tabBarComponent: props => <TabBar {...props} />,
    }
)
