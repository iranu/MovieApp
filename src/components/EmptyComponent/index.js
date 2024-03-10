import {View, Text, StyleSheet} from 'react-native';
import { SCREEN_HEIGHT } from '../../constant';
import colors from '../../theme/colors';
import { fontType } from '../../theme/font';
import strings from '../../strings';

export default EmptyComponent = () => (
  <View style={EmptyComponentStyles.emptyView}>
    <Text style={EmptyComponentStyles.text}>{strings.emptyComponentText}</Text>
  </View>
);

const EmptyComponentStyles = StyleSheet.create({
  emptyView: {
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
  },
  text:{
    fontSize:16,
    textAlign: 'center', 
    color: colors.white,
    fontFamily: fontType.TRegular,
  }
  
});
