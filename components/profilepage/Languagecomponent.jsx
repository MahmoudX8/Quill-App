import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import fonts from '@/assets/fonts/fonts';
import { useTheme } from '../../contexts/ThemeContext';
import colors from '@/assets/colors/colors';

const Languagecomponent = () => {
    const {darkMode} = useTheme();
  return (
    <View style={[styles.container]}>
        <View>
        <Text style={[styles.title,styles.text,{fontSize:25, color: darkMode? "white":"black"}]}>Language</Text>
        </View>
        <View style={[styles.compcontainer,{backgroundColor:darkMode?'#282828ff':colors.input}]}>
            <View style={{flexDirection:'row',gap:8,alignItems:'center'}}>
            <Text style={{color:'grey'}}>EN</Text>
            <Text style={[styles.text,{color:darkMode?"white":"black", fontSize:15}]}>English</Text>
            </View>
            <Ionicons name='checkmark-circle' size={20} color={darkMode?'white':'black'}/>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        height: 200,
        padding:15,
    },
    title:{
        paddingVertical:10,
        marginBottom:8,
    },
    text:{
        fontFamily: fonts.main
    },
    compcontainer:{
        backgroundColor:'red',
        padding:12,
        margin:4,
        borderRadius: 8,
        // height:150,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:"center",
    },
})
export default Languagecomponent