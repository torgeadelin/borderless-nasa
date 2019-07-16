import React, { Component } from 'react'
import { Text, SafeAreaView, View, ScrollView, StatusBar, StyleSheet } from 'react-native'
import ImageThumbnail from '../../Components/ImageThumbnail';
import { Images, ApplicationStyles, Colors } from '../../Themes';
import ImageModal from '../../Components/ImageModal';
import { PropTypes } from 'react'

const images = [
    { id: 1, source: Images.img1 },
    { id: 2, source: Images.img2 },
    { id: 3, source: Images.img3 },
]


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.thumbnails = images.map(image => React.createRef())
        this.closeModal = this.closeModal.bind(this)
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
        return (
            <SafeAreaView contentInsetAdjustmentBehaviour="automatic" style={[ApplicationStyles.screen.mainContainer, { backgroundColor: Colors.dark }]}>
                <StatusBar barStyle="light-content" />
                <ScrollView style={ApplicationStyles.screen.container}>
                    {images.map((image, index) => {
                        return (
                            <ImageThumbnail
                                ref={this.thumbnails[index]}
                                key={image.id}
                                image={image}
                                selected={selectedImage && selectedImage.id == image.id}
                                onPress={() => this.selectImage(image, index)}
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
