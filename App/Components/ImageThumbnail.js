import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Metrics, ApplicationStyles, Colors } from '../Themes'
import { TouchableWithoutFeedback, View, Animated, Platform, StatusBar } from 'react-native'
import { Title, Text, Subtitle } from '../Components/Typography'
import { Flex } from './Layout';
import { BlackGradient } from '../Themes/Gradients'
import { BEZIER } from '../Utils/Animations'
import { truncate } from '../Utils/TextFiltering';

const offset = (v) => (Platform.OS === "android" ? (v + StatusBar.currentHeight) : v);

const Thumbnail = styled.ImageBackground`
    height: 100%;
    width: 100%;   
    overflow: hidden; 
  
`

const Container = styled.View`
    border-radius: ${Metrics.radius};
    margin-bottom: ${Metrics.radius};
    height: ${Metrics.screenWidth * 0.6};
    ${ApplicationStyles.shadows.darkShadow};
    background-color: ${Colors.dark};
`

const Wrapper = styled(Animated.View)`
    position: relative;
    flex: 1;
    justify-content: flex-end;
`

const Footer = styled(BlackGradient)`
    width: 100%;
    padding: ${Metrics.space.lg}px ${Metrics.space.xl}px;
    border-bottom-left-radius: ${Metrics.radius};
    border-bottom-right-radius: ${Metrics.radius};
`

const animationConfig = {
    duration: 150,
    easing: BEZIER,
}

export default class ImageThumbnail extends Component {

    ref = React.createRef()

    measure = async () => new Promise(resolve => this.ref.current.measureInWindow((x, y, width, height) => resolve({
        x, y: offset(y), width, height,
    })));

    position = new Animated.Value(0)

    outAnimation = (val) =>
        Animated.timing(this.position, {
            toValue: val,
            ...animationConfig
        })


    customOnPress = () => {
        //Animation goes here
        this.outAnimation(1).start(() => {
            this.props.onPress()
        })
    }

    showFooter = () => {
        this.outAnimation(2).start()
    }

    render() {
        const { ref } = this
        const { image } = this.props
        var { title, secondary_creator } = this.props.image.data[0]

        return (
            <TouchableWithoutFeedback onPress={this.customOnPress}>
                <Animated.View >
                    <Container {...{ ref }}>
                        <Thumbnail imageStyle={{ borderRadius: Metrics.radius }} source={{ uri: image.links[0].href }}>
                        <Wrapper style={{
                                transform: [
                                    {
                                        translateY: this.position.interpolate({
                                            inputRange: [0, 1, 2],
                                            outputRange: [0, 60, 0]
                                        })
                                    },
                                ]
                            }}>
                                <Footer>
                                    <Subtitle style={{
                                        transform: [
                                            {
                                                translateY: this.position.interpolate({
                                                    inputRange: [0, 1, 2],
                                                    outputRange: [0, 75, 0]
                                                })
                                            }
                                        ]
                                    }} bold color={Colors.white}>{truncate(title, 25)}</Subtitle>
                                    {secondary_creator && <Text style={{
                                        transform: [
                                            {
                                                translateY: this.position.interpolate({
                                                    inputRange: [0, 1, 2],
                                                    outputRange: [0, 100, 0]
                                                })
                                            }
                                        ]
                                    }} mt={-5} color={Colors.white}>{truncate(secondary_creator)}</Text>}
                                </Footer>
                            </Wrapper>
                        </Thumbnail>
                    </Container>
                </Animated.View>
            </TouchableWithoutFeedback >
        )

    }
}
