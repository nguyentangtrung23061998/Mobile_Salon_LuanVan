import styles from './style';
import React from 'react';
import { View, Image, Text } from 'react-native';

const ImgSwiper = ({
    image,
    titleText,
    descriptionText,
    topTitle,
    topDescription
}) => {
    return (
        <View style={[styles.view0, {marginTop: topTitle ? 30 : 100}]}>
            {topTitle && <Text style={[styles.text2]}>{topTitle}</Text>}
            {topDescription && <Text style={[styles.text1]}>{topDescription}</Text>}
            {image && <Image source={image} />}
            {titleText && <Text style={[styles.text0]}>{titleText}</Text>}
            <Text style={[styles.text1]}>{descriptionText}</Text>
        </View>
    )
}

export default ImgSwiper;