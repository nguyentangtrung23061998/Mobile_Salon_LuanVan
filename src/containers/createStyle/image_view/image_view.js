import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import iconClose from '../../../assets/icon/iconClose/icon_close.png';
import styles from './style';
import { MTPImage0 } from '../../mtp_image';
import Trung from '../../image/image';
const ImageView = ({ onRemove, imageUri }) => {
    return (
        <View style={[styles.view0]}>
            <TouchableOpacity onPress={onRemove} style={[styles.touchableOpacity0]}>
                <Image source={iconClose} />
            </TouchableOpacity>
            <Button
                disabled={true}
                containerStyle={[styles.button0]}
                ViewComponent={() => (
                    <Image style={[styles.image0]} source={{ uri: imageUri }} />
                )}
            />
        </View>
    );
};
export const ImageView0 = ({ onRemove, source }) => {
    return (
        <View style={[styles.view0]}>
            <TouchableOpacity onPress={onRemove} style={[styles.touchableOpacity0]}>
                <Image source={iconClose} />
            </TouchableOpacity>
            <Button
                disabled={true}
                containerStyle={[styles.button0]}
                ViewComponent={() => (
                    <MTPImage0 style={[styles.image0]} source={source} />
                )}
            />
        </View>
    );
};

export const CachedImageView = ({onRemove, imageUri}) => {
    return (
      <View style={[styles.view0]}>
        <TouchableOpacity onPress={onRemove} style={[styles.touchableOpacity0]}>
          <Image source={iconClose} />
        </TouchableOpacity>
        <Button
          disabled={true}
          containerStyle={[styles.button0]}
          ViewComponent={() => (
            <Trung
              source={imageUri}
              style={[styles.image0]}
              // source={{
              //   uri: imageUri,
              // }}
              // PlaceholderContent={<ActivityIndicator />}
              // resizeMode={FastImage.resizeMode.stretch}
            />
          )}
        />
      </View>
    );
  };
export default ImageView;