import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useTheme } from "../../contexts/ThemeContext";
import colors from '@/assets/colors/colors';
import fonts from '@/assets/fonts/fonts';
const Themecomponent = () => {
    const { darkMode, setMode } = useTheme();
  return (
    <>
    <View style={[styles.container]}>
        <View style={[styles.title]}>
            <Text style={[styles.text, {fontSize:25, color:darkMode?'white':'black'}]}>Theme</Text>
        </View>
        <View style={[styles.compcontainer,{backgroundColor:darkMode?'#282828ff':colors.input}]}>
            <Pressable onPress={()=>setMode('light')} style={{flexDirection:'row', borderBottomColor:'#a5a5a5ff', borderBottomWidth:2,paddingVertical:12, justifyContent:'space-between'}}>
                <View style={{gap:8, flexDirection:'row'}}>
                    <Ionicons name='sunny' color={darkMode?'white':'black'} size={20}/>
                    <Text style={[styles.text,{color:darkMode?'white':'black'}]}>Light</Text>
                </View>
                {!darkMode && <Ionicons name='checkmark-circle' size={20} color={darkMode?'white':'black'} style={{marginRight:4}}/>}
            </Pressable>
            <Pressable onPress={()=>setMode('dark')} style={{flexDirection:'row',paddingVertical:12, justifyContent:'space-between',alignItems:'center'}}>
                <View style={{gap:8,flexDirection:'row'}}>
                    <Ionicons name='moon' color={darkMode?'white':'black'} size={20}/>
                    <Text style={[styles.text,{color:darkMode?'white':'black'}]}>Dark</Text>
                </View>
                {darkMode && <Ionicons name='checkmark-circle' size={20} color={darkMode?'white':'black'} style={{marginRight:4,marginTop:3}}/>}
            </Pressable>
        </View>
    </View>
    </>
  )
}
const styles = StyleSheet.create({
    container:{
        height: 250,
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
        // justifyContent:'space-around'
    },
});
export default Themecomponent