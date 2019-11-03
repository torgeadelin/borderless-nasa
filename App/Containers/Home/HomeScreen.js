import React from 'react'
import { View, ScrollView, StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import ImageThumbnail from '../../Components/ImageThumbnail'
import { Colors, Metrics } from '../../Themes'
import ImageModal from '../../Components/ImageModal'

//Redux
import { connect } from 'react-redux'
import NasaImagesActions from '../../Redux/NasaImagesRedux'
import LoadingIndicator from '../../Components/LoadingIndicator'
import Header from '../../Components/Home/Header'
import Animated from 'react-native-reanimated'



export class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.closeModal = this.closeModal.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.thumbnails = [...Array(100).keys()]
        this.thumbnails = this.thumbnails.map(i => React.createRef())
        this.scrollOffsetY = new Animated.Value(0)
    }

    state = {
        selectedImage: null,
        position: null,
        fetching: true,
        hideThumbnailId: null,
        index: null,
    }

    selectImage = async (selectedImage, index) => {
        const position = await this.thumbnails[index].current.measure()
        this.setState({
            selectedImage,
            position,
            index
        })
    }

    componentWillMount() {
        this.props.getImages('apollo 11')
    }

    closeModal() {
        this.setState({
            selectedImage: null,
            position: null,
        })
        //Show footer after close modal
        this.thumbnails[this.state.index].current.showFooter()
    }

    fetchData(searchTerm) {
        this.props.getImages(searchTerm)
    }

    render() {

        const { selectedImage, position } = this.state
        //Display loading while fetching data
        if (this.props.nasaImages.fetching) return <LoadingIndicator />
        else {
            return (
                <SafeAreaView
                    forceInset={{ top: 'never' }}
                    contentInsetAdjustmentBehaviour="automatic"
                    style={[{ flex: 1, backgroundColor: Colors.dark }]}

                >
                    <StatusBar barStyle="light-content" />
                    <Header
                        categoriesTranslate={
                            this.scrollOffsetY.interpolate({
                                inputRange: [0, 100],
                                outputRange: [0, 350],
                                extrapolateLeft: 'clamp'
                            })
                        }
                        headerShrink={
                            this.scrollOffsetY.interpolate({
                                inputRange: [0, 50],
                                outputRange: [285, 200],
                                extrapolateRight: 'clamp'
                            })
                        }
                        searchBarTranslate={
                            this.scrollOffsetY.interpolate({
                                inputRange: [0, 100],
                                outputRange: [0, -20],
                                extrapolateRight: 'clamp'
                            })
                        }
                        logoScale={
                            this.scrollOffsetY.interpolate({
                                inputRange: [0, 100],
                                outputRange: [70, 50],
                                extrapolateRight: 'clamp'
                            })
                        }

                        handleOnSearchRequest={this.fetchData} />

                    <Animated.ScrollView

                        style={{ padding: 20 }}
                        scrollEventThrottle={16}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollOffsetY } } }], { useNativeDriver: true })}
                    >
                        <View>
                            {this.props.nasaImages.payload.map((img, index) => {
                                return (
                                    <ImageThumbnail
                                        ref={this.thumbnails[index]}
                                        key={index}
                                        image={img}
                                        selected={selectedImage && selectedImage.id == img.id}
                                        onPress={() => this.selectImage(img, index)}
                                    />)
                            })}
                        </View>
                    </Animated.ScrollView>
                    {
                        //Modal
                        !!selectedImage && (
                            <View style={StyleSheet.absoluteFill}>
                                <ImageModal closeModal={this.closeModal} image={selectedImage} {...{ position }} />
                            </View>
                        )
                    }
                </SafeAreaView>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    nasaImages: state.nasaImages
})

const mapDispatchToProps = dispatch => {
    return {
        getImages: (searchTerm) => dispatch(NasaImagesActions.nasaImagesRequest(searchTerm))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

