import {View, ActivityIndicator, StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import {SCREEN_HEIGHT} from '../../constant';

const LoadingComponent = () => (
  <View style={LoadingComponentStyles.container}>
    <ActivityIndicator size="small" color={colors.primary} />
  </View>
);

const LoadingComponentStyles = StyleSheet.create({
  container: {
    top: SCREEN_HEIGHT / 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingComponent;
