import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import SearchInput from '../SearchInput';
import colors from '../../theme/colors';
import images from '../../assets/app_images';
import {fontType} from '../../theme/font';
import strings from '../../strings';

const Header = ({onStartSearching, resetSearch}) => {

  const {navbarBackgroundImage, back, search, close} = images;

  const [searchText, setSearchText] = useState('');
  const [rightIcon, setRightIcon] = useState(search);
  const [isSearchEnable, setIsSearchEnable] = useState(false);
  const inputRef = useRef();
  // effect to focus search input when search is enabled
  useEffect(() => {
    if (isSearchEnable) {
      inputRef?.current.focusInput();
    }
  }, [isSearchEnable]);

  // function to handle text change in search input
  const onChangeText = text => {
    text.length > 0 ? setRightIcon(close) : setRightIcon(search)
    setSearchText(text);
    onStartSearching(text);
  };

  // function to handle back button press
  const handleBack = () => {
    resetSearch();
    setSearchText('');
    setIsSearchEnable(false);
    inputRef.current?.focusInput();
    setRightIcon(search)
  };

  const onPressRightIcon = () =>{
    searchText.length > 0 ? setSearchText('') : setIsSearchEnable(true)
    setRightIcon(search)
    resetSearch();
  }

  return (
    <ImageBackground source={navbarBackgroundImage} style={HeaderStyles.headerTopContainer}>
      <View style={HeaderStyles.headerContainer}>
        <TouchableOpacity disabled={!isSearchEnable} onPress={handleBack}>
          <Image style={HeaderStyles.backButtonImage} source={back} />
        </TouchableOpacity>
        {isSearchEnable ? (
          <SearchInput
            ref={inputRef}
            value={searchText}
            onChangeText={onChangeText}
          />
        ) : (
          <View style={HeaderStyles.titleContainer}>
            <Text style={HeaderStyles.titleText}>{strings.pageTitle}</Text>
          </View>
        )}
        <TouchableOpacity onPress={onPressRightIcon}>
          <Image style={HeaderStyles.imageSearch} source={rightIcon} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const HeaderStyles = StyleSheet.create({
  headerTopContainer: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    alignContent: 'center',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButtonImage: {height: 18, width: 18},
  titleContainer: {flex: 0.9},
  imageSearch: {height: 18, width: 18},
  titleText: {
    color: colors.white,
    fontFamily: fontType.TRegular,
    fontSize: 24,
  },
});

export default Header;
