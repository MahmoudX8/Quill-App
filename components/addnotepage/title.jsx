import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import fonts from '@/assets/fonts/fonts'
import colors from '@/assets/colors/colors'
import { useTheme } from "../../contexts/ThemeContext";

const title = () => {
  const {darkMode} = useTheme();
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text, styles.subtitle, {color: darkMode ? 'white' : colors.secondry}]}>Add Note</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        paddingTop: 16,
        alignItems: 'center',
        gap: 15,
        marginTop: 30,
    },
    text:{
      fontFamily: fonts.main,
      color: colors.secondry,

    },
    subtitle:{
      marginVertical: 10,
      fontSize:40,

    },
})
export default title