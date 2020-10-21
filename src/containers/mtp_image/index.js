import Lodash from 'lodash';
import React from 'react';
import {ActivityIndicator, Image} from 'react-native';
import {Image as RNEImage} from 'react-native-elements';
import FastImage from 'react-native-fast-image';

const isValidUrl = (string) => {
    try {
        new URL(string);
    } catch (_) {
        return false;
    }
    return true;
}

export const MTPImage0 = React.memo(
    ({ source, style, PlaceholderContent = <ActivityIndicator /> }) => {
        if (
            (source === undefined || source === null || Lodash.isEmpty(source)) &&
            !Lodash.isNumber(source)
        ) {
            return <></>;
        }

        if (source && Lodash.isNumber(source)) {
            return <Image source={source} style={[style]} />;
        }
        if (source && isValidUrl(source) && source[0] !== '~') {
            return (
                <RNEImage style={[style]} PlaceholderContent={PlaceholderContent}>
                    <FastImage style={[style]} source={{ uri: source }} />
                </RNEImage>
            );
        }
        if (source && isValidUrl(source) && source[0] === '~') {
            return <Image source={{ uri: source }} style={[style]} />;
        }
    }
)