import { View, Text, StyleSheet,Pressable } from 'react-native'
import React, { useState } from 'react'
import colors from '@/assets/colors/colors';
import fonts from '@/assets/fonts/fonts';
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { deleteNote } from "../../storage/storage";
const Firstcomponent = ({note}) => {
    const router = useRouter();
    const {loading: authloading, session} = useAuth();
    const handleRemove = async()=>{
      if (authloading) return;
      if(session){
        const {error} = await supabase.from('notes').delete().eq('id', note.id);
        if (error) {
          console.log(error.message);
          return;
        }
        router.replace('/notes');
      }else{
        await deleteNote(note.id);
        router.replace('/notes');
      }
    }

  return (
    <>
      <View style={[styles.container]}>
        <Pressable onPress={()=>{router.back()}}>
            <FontAwesome name='arrow-left' color={colors.primary} size={18}/>
        </Pressable>
        <Text style={[styles.text,{fontSize:30}]}>Note</Text>
        <Pressable onPress={handleRemove}>
            <FontAwesome name='trash' size={20} color={colors.primary}/>
        </Pressable>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
    text:{
        fontFamily: fonts.main,
        color: colors.primary,
        fontWeight: 'bold'
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 20,
        position: 'static',
        alignItems:'center',
    }
});
export default Firstcomponent