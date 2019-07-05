import React, { Component } from 'react'
import { Text, SafeAreaView, View } from 'react-native'
import ImageThumbnail from '../../Components/ImageThumbnail';
import { Images, ApplicationStyles } from '../../Themes';
import ImageModal from '../../Components/ImageModal';

const images = [
    { id: 1, source: Images.launchScreenBackground },
    { id: 2, source: Images.spacedust },
]


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.thumbnails = images.map(image => React.createRef())
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

    render() {
        const { selectedImage, position } = this.state
        return (
            <SafeAreaView contentInsetAdjustmentBehaviour="automatic" style={ApplicationStyles.screen.mainContainer}>
                <View style={ApplicationStyles.screen.container}>
                    {images.map((image, index) => {
                        return (
                            <ImageThumbnail
                                ref={this.thumbnails[index]}
                                key={image.id}
                                image={image}
                                onPress={() => this.selectImage(image, index)}
                            />)
                    })}
                </View>
                {selectedImage && (
                    <ImageModal image={selectedImage} {...{ position }} />
                )}
            </SafeAreaView>

        )
    }
}
