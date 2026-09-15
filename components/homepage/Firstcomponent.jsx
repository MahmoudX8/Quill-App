import { Text, View, Modal ,StyleSheet, ScrollView, StatusBar, ImageBackground, Image, Button, ActivityIndicator, Pressable} from "react-native";
import colors from "@/assets/colors/colors.js";
import fonts from "@/assets/fonts/fonts.js";
import React, { useState } from 'react'
import { useNavigation, useRouter } from "expo-router";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useTheme } from "../../contexts/ThemeContext";
export default function firstcomponents() {
  const {darkMode} =useTheme();
  const navigation = useNavigation();
  const router = useRouter();
  const [fontsLoaded] = useFonts({
  Poppins_400Regular,
  Poppins_600SemiBold,
  });
  return (
    <>
    <View style={[styles.container, styles.text,{backgroundColor: darkMode ? "black" : ""}]}>
      <View style={styles.fircomponent}>
        <View style={{paddingTop:40,height: 300}}>
          <Text style={[{fontSize:40, width:200, color:darkMode?"white":colors.secondry,}, styles.text]}>Write it down. Think it through.</Text>
        </View>
        <View style={styles.btnview}>
        <Pressable style={{backgroundColor:colors.primary,alignItems:'center', paddingVertical:5, width:100, borderRadius:6}} onPress={()=>router.push('/notes')}><Text style={{color: "white", fontFamily:fonts.main}}>MY NOTES</Text></Pressable>
        </View>
      </View>
      <View style={[styles.designcontainer,{gap:12, alignSelf:'center', alignItems:'flex-end'}]}>
        <View style={[styles.design, {width:180}]}>
        </View>
        <View style={[styles.design, {width:270,}]}>
        </View>
        <View style={[styles.design, {width:230,}]}>
        </View>
        <View style={[styles.design, {width:270,}]}>
        </View>
        <View style={[styles.design, {width:165,}]}>
        </View>
      </View>
    </View>
    </>
  )
}
const styles = StyleSheet.create({
  text:{
    fontFamily: fonts.main,
  },
  container:{
    flexDirection: 'row',
    width:50,
    justifyContent:'space-between',
    width: '',
    paddingBottom: 50,
  },
  fircomponent:{
    height:400,
    padding:20, 
    display:"flex",
    flexDirection:"column",
    marginBottom:10
  },
  btnview:{
    width:180,
    height:40,
    justifyContent:'flex-end',
  },
  design:{
    height: 50,
    backgroundColor: colors.primary,
    borderStartStartRadius:14,
    borderBottomColor: colors.barsdarkshadow,
    borderBottomWidth:6,
    borderTopColor: colors.lightshadow,
    borderTopWidth:8,
    paddingLeft: 7,
  },
  msgs:{
    fontSize:20,
    fontFamily: fonts.main,
    fontWeight:'bold',
    color: colors.secondry,
  }
});