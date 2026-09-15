import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from "../../contexts/ThemeContext";
import fonts from '@/assets/fonts/fonts';
import colors from '@/assets/colors/colors';
const Title = () => {
    const {darkMode} = useTheme();
  return (
    <View>
      <Text style={[styles.text, styles.title, { color: darkMode ? "white" : colors.secondry }]}>
          Favorites
        </Text>
    </View>
  )
}
const styles = StyleSheet.create({
    text: { fontFamily: fonts.main, color: colors.dark },
    title: { marginBottom: 10, marginTop:30, fontSize: 40, alignSelf:'center' },
})
export default Title