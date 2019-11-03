import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import styled from 'styled-components'

import { Colors, Metrics, Images, Fonts, ApplicationStyles } from '../../Themes'
import { Title, Subtitle } from '../Typography';
import Category from './Category'
import Animated from 'react-native-reanimated'

const ImageBackground = styled.ImageBackground`
    position: relative;
    width: 100%;
    background-color: ${Colors.dark};
    overflow: hidden;
`

const Logo = styled(Animated.Image)`
    position: absolute;
    top: 55px;
    right: 20px;
    width: 70px;
    height: 70px;
`

const SearchBar = styled.TextInput`
    background-color: rgba(255, 255, 255, 0.2);
    padding: ${Metrics.space.xl - 2}px;
    border-radius: ${Metrics.buttonRadius}px;
    font-size: ${Fonts.size.text + 2};
    color: ${Colors.white};
    font-family: ${Fonts.type.base};
`

const AnimatedScroll = Animated.createAnimatedComponent(ScrollView)
const Background = Animated.createAnimatedComponent(ImageBackground)
const AnimatedSearchBar = Animated.createAnimatedComponent(SearchBar)

const categories = [{
    id: 0,
    name: "Earth",
    searchTerm: 'earth'
},
{
    id: 1,
    name: "Mars",
    searchTerm: 'mars'
},
{
    id: 2,
    name: "Space",
    searchTerm: 'space'
},
{
    id: 3,
    name: "Space",
    searchTerm: 'space'
},
{
    id: 4,
    name: "Space",
    searchTerm: 'space'
}
    , {
    id: 5,
    name: "Space",
    searchTerm: 'space'
}
]

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: true,
            searchTerm: '',
            category: categories[0],
            scrollOffsetX: 0
        }
        this.categoriesRef = categories.map(c => React.createRef())
        this.scrollView = React.createRef()
        this.selectedCategoryPosition = 0
    }

    search = () => {
        this.props.handleOnSearchRequest(this.state.searchTerm)
    }

    handleChangeCategory = async (category) => {
        this.selectedCategoryPosition = await this.categoriesRef[category.id].current.measure(this.scrollView)
        this.scrollView.getNode().scrollTo({ x: this.selectedCategoryPosition.x - Metrics.screenWidth / 2, animated: true });
        this.setState({ category })
    }

    render() {
        return (
            <Background style={{ height: this.props.headerShrink }} source={Images.homeHeaderBackground}>
                <Animated.View style={{ paddingHorizontal: Metrics.doubleBaseMargin }}>
                    <Logo
                        source={Images.logo}
                        style={{
                            width: this.props.logoScale,
                            height: this.props.logoScale
                        }}
                    />
                    <Animated.View
                        style={{
                            transform: [{ translateY: this.props.searchBarTranslate }],
                            marginBottom: Metrics.space.lg
                        }}
                    >
                        <Subtitle mb={Metrics.space.xl} mt={Metrics.space.xxl * 3} bold color={Colors.white}>Nasa Image Database</Subtitle>
                        <AnimatedSearchBar onSubmitEditing={this.search} onChangeText={(searchTerm) => this.setState({ searchTerm })} selectionColor={Colors.red} underlineColorAndroid={Colors.clear} multiline={false} placeholderTextColor={Colors.white50} placeholder='Search...' />
                    </Animated.View>
                </Animated.View>
                {this.state.expanded &&
                    <AnimatedScroll
                        ref={c => (this.scrollView = c)}
                        contentContainerStyle={{
                            marginLeft: Metrics.doubleBaseMargin,
                            paddingRight: Metrics.doubleBaseMargin
                        }}
                        showsHorizontalScrollIndicator={false}
                        style={{
                            transform: [{ translateY: this.props.categoriesTranslate }],
                            width: '100%',
                            marginTop: Metrics.space.xl,
                            marginBottom: Metrics.baseMargin
                        }}
                        horizontal
                    >
                        {categories.map((category, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => this.handleChangeCategory(category)}>
                                    <Category ref={this.categoriesRef[index]} name={category.name} searchTerm={category.searchTerm} active={this.state.category == category} />
                                </TouchableOpacity>
                            )
                        })}
                    </AnimatedScroll>}
            </Background>
        )
    }
}
