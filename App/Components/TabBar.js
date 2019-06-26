import React from 'react'
import styled from 'styled-components/native'
import { isIphoneX } from '../Utils/iPhoneX'
import { Metrics, Colors, ApplicationStyles } from '../Themes'
import { Animated, Easing } from 'react-native'

const Wrapper = styled.View`
    flex-direction: row;
    width: 100%;
    elevation: 2;
    padding-bottom: ${isIphoneX() ? 30 : 0}px;
    background-color: ${Colors.white};
    padding-top: ${Metrics.space.xl};
    padding-horizontal: ${Metrics.doubleBaseMargin}px;
    ${ApplicationStyles.shadows.lightShadow};
    position: relative;
`

const TabButton = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 100;
    background-color: ${p => p.isRouteActive ? Colors.clear : Colors.clear};
    padding-vertical: ${Metrics.space.lg + 3}px;
    flex-grow: ${p => p.isRouteActive ? (p.labelLength / 10 + 1) : 1};
`

const Label = styled.Text`
    margin-left: ${Metrics.space.lg};
    font-weight: bold;
    color: #2B7C85;
`

const Dot = styled(Animated.View)`
    position: absolute;
    height: ${p => p.height};
    background-color: #E4F7F7;
    /* left: ${p => p.position}; */
    width: ${p => p.width};
    z-index: -1;
    top: ${Metrics.space.lg + 8}px;
    border-radius: 100;
`

const animation = value => Animated.spring(value, {
    toValue: 1,
});

export class TabBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prevPos: 1 / 20,
            pos: 0,
            width: 0,
            animatedPos: new Animated.Value(1),
            height: 0,
        }
    }

    componentWillMount() {
        animation(this.state.animatedPos).start()
        this.setState({
            prevPos: this.state.pos
        })
        console.log('id id')
    }

    render() {
        const {
            renderIcon,
            getLabelText,
            activeTintColor,
            inactiveTintColor,
            onTabPress,
            onTabLongPress,
            getAccessibilityLabel,
            navigation
        } = this.props;

        const { routes, index: activeRouteIndex } = navigation.state;
        let width = 0

        return (
            <Wrapper>

                {routes.map((route, routeIndex) => {
                    const isRouteActive = routeIndex === activeRouteIndex;
                    const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
                    const labelLength = getLabelText({ route }).length

                    return (
                        <TabButton
                            labelLength={labelLength}
                            onLayout={(event) => {
                                isRouteActive && this.setState({
                                    pos: event.nativeEvent.layout.x,
                                    width: event.nativeEvent.layout.width,
                                    height: event.nativeEvent.layout.height
                                })
                                if (event.nativeEvent.layout.x == 20) {
                                    this.setState({
                                        prevPos: 20
                                    })
                                }
                                console.log('state was updated', this.state)
                            }
                            }
                            isRouteActive={isRouteActive}
                            key={routeIndex}
                            onPress={() => {
                                if (!isRouteActive) {
                                    this.setState({
                                        prevPos: this.state.pos
                                    })

                                    animation(this.state.animatedPos).start(() => {

                                        this.setState({
                                            prevPos: this.state.pos,
                                        })

                                        this.state.animatedPos.setValue(0)
                                        console.log('finish', this.state)
                                    })


                                    console.log('what about here', this.state)

                                    onTabPress({ route });
                                }

                            }}
                            onLongPress={() => {
                                onTabLongPress({ route });
                            }}
                            accessibilityLabel={getAccessibilityLabel({ route })}
                        >
                            {renderIcon({ route, focused: isRouteActive, tintColor })}

                            {isRouteActive && <Label>{getLabelText({ route })}</Label>}
                        </TabButton>
                    );
                })}
                <Dot style={{
                    left: this.state.animatedPos.interpolate({
                        inputRange: [0, 1],
                        outputRange: [this.state.prevPos, this.state.pos]
                    })
                }} width={this.state.width}
                    height={this.state.height} />
            </Wrapper>
        )
    }

}

