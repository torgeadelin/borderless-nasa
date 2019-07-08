import React, { Component } from 'react'
import { Text, SafeAreaView, View, ScrollView } from 'react-native'
import ImageThumbnail from '../../Components/ImageThumbnail';
import { Images, ApplicationStyles } from '../../Themes';
import ImageModal from '../../Components/ImageModal';
import { PropTypes } from 'react'

const images = [
    { id: 1, source: Images.img1 },
    { id: 2, source: Images.img2 },
    { id: 3, source: Images.spacedust },
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
    }


    selectImage = async (selectedImage, index) => {
        const position = await this.thumbnails[index].current.measure()
        this.setState({
            selectedImage,
            position
        })
    }

    closeModal() {
        this.setState({
            selectedImage: null
        })
    }

    render() {
        const { selectedImage, position } = this.state
        return (
            <SafeAreaView contentInsetAdjustmentBehaviour="automatic" style={ApplicationStyles.screen.mainContainer}>
                <ScrollView style={ApplicationStyles.screen.container}>
                    {images.map((image, index) => {
                        return (
                            <ImageThumbnail
                                ref={this.thumbnails[index]}
                                key={image.id}
                                image={image}
                                onPress={() => this.selectImage(image, index)}
                            />)
                    })}
                </ScrollView>
                {selectedImage && (
                    <ImageModal closeModal={this.closeModal} image={selectedImage} {...{ position }} />
                )}
            </SafeAreaView>

        )
    }
}
