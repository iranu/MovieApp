import React ,{useState,useEffect}from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import colors from '../../theme/colors';
import images from '../../assets/app_images';
import { fontType } from '../../theme/font';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default ListItem = ({item}) => {
  //extract exact image name
  const name = item['poster-image'].replace(/\.[^/.]+$/, '');
  const [imgUri, setImgUri] = useState('');

  //set image source from local
  useEffect(() => {
    setImgUri(images[name]);
  }, []);

  //handle image error case
  const onError = () => {
    setImgUri(null);
  };

  return (
    <View style={ListItemStyles.itemContainer}>
      <Image
        onError={() => onError()}
        resizeMode={'contain'}
        source={imgUri !=null ? imgUri : images.missingImage}
        style={ListItemStyles.image}
      />
      <Text numberOfLines={1} style={ListItemStyles.name}>
        {item.name}
      </Text>
    </View>
  );
};

const ListItemStyles = StyleSheet.create({
  itemContainer: {
    marginRight: wp('1%'),
    marginBottom: hp('3%'),
    alignItems: 'flex-end',
  },
  image: {
    width: wp('32%'),
    height: hp('24%'),
    resizeMode: 'contain',
  },
  name: {
    width: wp('31%'),
    color: colors.white,
    fontSize: 16,
    marginTop: 10,
    fontFamily: fontType.TRegular,
  }
});
