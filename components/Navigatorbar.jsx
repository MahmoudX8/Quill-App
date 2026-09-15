import { View, Text, StyleSheet, Pressable, Button } from 'react-native'
import React from 'react';
import { FaHome } from "react-icons/fa";
import colors from "@/assets/colors/colors.js";
import { FaNoteSticky } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { usePathname, useRouter } from 'expo-router';
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';

export default function Navigatorbar () {
    const pathname = usePathname();
    const router = useRouter();
  return (
    <View style={styles.navigatorbar}>
      <View>
        <Pressable style={pathname === "/"&& {color:colors.primary}} onPress={()=>{router.push("/")}}>
        <Ionicons name='home' color={pathname=='/'? colors.primary : 'grey'} size={20}/>
        </Pressable>
      </View>
      <View>
        <Pressable style={pathname === "/notes" && {color:colors.primary}} onPress={()=>{router.push({pathname:'/notes'})}}>
        <Ionicons name='document-text' size={22} color={pathname=='/notes'? colors.primary : 'grey'} />
        </Pressable>
      </View>
      <View>
        <Pressable onPress={()=>{router.push({pathname:'/addnote'})}}>
        <Ionicons name='add' size={28} style={{height: 33, width: 33, textAlign:'center', backgroundColor:colors.primary, borderRadius:50 }}/>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={()=>{router.push({pathname: '/favourites'})}}>
        <Ionicons name='heart' size={24} color={pathname=='/favourites'? colors.primary : 'grey'}/>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={()=>{router.push({pathname: '/profile'})}}>
        <Ionicons name='person' color={pathname=='/profile'? colors.primary : 'grey'} size={20}/>
        </Pressable>
      </View>
    </View>
  )
};
const styles = StyleSheet.create({
    navigatorbar:{
        width:250,
        backgroundColor:colors.dark,
        backdropFilter: 20,
        color: "grey",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignSelf: "center",
        position:'absolute',
        bottom: 30,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        boxShadow: [{color: "#3a3a3aae", offsetX:3, offsetY: 8, blurRadius:12}],
    },
    icon:{
        height: 20,
        width: 20,
    }
});