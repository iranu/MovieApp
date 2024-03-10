import React, { useRef, useState,useImperativeHandle, forwardRef  } from "react"
import { TextInput,StyleSheet } from "react-native"
import colors from "../../theme/colors";
import { fontType } from "../../theme/font";
import strings from "../../strings";
const SearchInput  = ({
    value = '',
    onChangeText,
},ref) => {
  const inputRef = useRef()

  useImperativeHandle(ref, () => ({
    focusInput: () => { focusInput() },
  }))

  const focusInput = () => {
    inputRef.current.focus()
  }

 const [borderBottomWidth,setBorderBottomWidth] = useState(0)
  return (
    <TextInput
      ref={inputRef}
      style={[SearchInputStyles.input,{borderBottomWidth:borderBottomWidth}]}
      onChangeText={onChangeText}
      value={value}
      placeholder={strings.inputPlaceholder}
      placeholderTextColor="white"
      onFocus={() =>setBorderBottomWidth (1) }
      maxLength={35}
    />
  );
};

const SearchInputStyles = StyleSheet.create({
    input: {
      borderBottomColor: colors.white,
      borderTopWidth:0,
      borderBottomWidth:1,
      fontSize: 16,
      height: 40,
      width: '75%',
      color: 'white',
      fontFamily: fontType.TRegular,
    },
  });

  export default forwardRef(SearchInput)