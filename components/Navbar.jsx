import { View, Text, Pressable, StyleSheet, Image, ImageBackground, Button } from 'react-native';
import React, { useState } from 'react';
import colors from "@/assets/colors/colors.js";
import {useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import {useTheme} from '../contexts/ThemeContext';
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';

export default function Navbar() {
  const {darkMode, changeMode} = useTheme();
  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
  });
  if(!fontsLoaded) return null;
    return (
    <View style={[styles.nav, {backgroundColor: darkMode ? "black" : ""}]}>
      <View style={styles.themecontainer}>
        <Pressable onPress={changeMode} style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
          {!darkMode ? <Ionicons color={colors.primary} style={styles.themeicon} size={20} name='sunny'/> : <Ionicons color={colors.primary} style={styles.themeicon} size={20} name='moon'/>}
        </Pressable>
      </View>
      <View style={styles.logocontainer}>
        <Text style={[styles.title, {color: darkMode? "white":colors.secondry}]}>Quill</Text>
        <Image source={darkMode? require("@/assets/logo_white.png") : require("@/assets/logowithoutbg.png")} style={styles.logo}></Image>
      </View>
      <View>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    nav:{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: 5,
        position:"static",
        alignItems:"center",
        color: colors.secondry,
        justifyContent: 'space-between',
        paddingHorizontal:16,
        // backgroundColor: darkMode == true ? "grey" : "white",
      },
      logocontainer:{
        flexDirection:"row",
        alignItems:'center',
        borderBottomColor: colors.primary,
        borderBottomWidth: 5,
        borderRadius: 5
      },
      title:{
      fontSize:35,
      fontFamily: 'Righteous_400Regular',
    },
    logo:{
      width:50,
      height:50,
      padding:10,
      borderRadius:20,
      // backgroundColor:colors.primary,
    },
    lis:{
        display:"flex",
        flexDirection:"row",
        gap:12
    },
    icon:{
      width:30,
      height:25,
    },
    themecontainer:{
      // paddingHorizontal: 18,
      // backgroundColor:'purple',

    },
    theme:{
      color: colors.primary,
    },
})