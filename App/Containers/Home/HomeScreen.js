import React, { Component } from 'react'
import { Text, SafeAreaView, View, ScrollView, StatusBar, StyleSheet } from 'react-native'
import ImageThumbnail from '../../Components/ImageThumbnail';
import { Images, ApplicationStyles, Colors, Metrics } from '../../Themes';
import { Title } from '../../Components/Typography'
import ImageModal from '../../Components/ImageModal';
import { PropTypes } from 'react'

//Redux
import { connect } from 'react-redux'
import NasaImagesActions from '../../Redux/NasaImagesRedux'
import LoadingIndicator from '../../Components/LoadingIndicator';

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.closeModal = this.closeModal.bind(this)
        this.thumbnails = [...Array(100).keys()]
        this.thumbnails = this.thumbnails.map(i => React.createRef())
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
        console.log(NasaImagesActions)
        this.props.getImages('apollo 11')

    }

    closeModal() {
        this.setState({
            selectedImage: null,
            position: null,
        })
        //Stop animation on modal

        //Show footer after close modal
        this.thumbnails[this.state.index].current.showFooter()
    }

    render() {
        const { selectedImage, position } = this.state
        if (this.props.nasaImages.fetching) return <LoadingIndicator />
        else {

            return (
                <SafeAreaView contentInsetAdjustmentBehaviour="automatic" style={[ApplicationStyles.screen.mainContainer, { backgroundColor: Colors.dark }]}>
                    <StatusBar barStyle="light-content" />

                    <ScrollView style={ApplicationStyles.screen.container}>
                        <Title mb={Metrics.space.xl} color={Colors.white}>NASA Imagery</Title>
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
                    </ScrollView>
                    {!!selectedImage && (
                        <View style={StyleSheet.absoluteFill}>
                            <ImageModal closeModal={this.closeModal} image={selectedImage} {...{ position }} />
                        </View>
                    )}
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

