import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import fakenotes from '../fakenotes';
import colors from '@/assets/colors/colors.js';
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import fonts from '@/assets/fonts/fonts';
import { useTheme } from "../../contexts/ThemeContext";
import { getNotes } from "../../storage/storage.js";
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from "../../lib/supabase";
export default function Secondcomponent() {
    const {darkMode} = useTheme();
    const [latestNotes, setLatestNotes] = useState([]);
    const {session, loading:authloading} = useAuth();
    const router = useRouter();
    useEffect(()=>{
        const fetchNotes = async()=>{
            if(authloading) return;
            if (session) {
                const { data, error } = await supabase.from('notes').select().eq('user_id', session.user.id).order('updated_at', { ascending: false, nullsFirst: false }).limit(5);
                if (error) {
                    console.log(error.message);
                    return;
                }
                setLatestNotes(data);
            }else{
            let fetched = await getNotes();
            fetched = fetched.sort((a,b)=>{
                const aTime = a.updated_at ? a.updated_at : a.created_at; const bTime = b.updated_at ? b.updated_at : b.created_at;
                return bTime - aTime;
            }).slice(0,5);
            setLatestNotes(fetched);
            }
        };
        fetchNotes();
    },[authloading, session]);
    return (
        <View style={[styles.seccomponent, styles.text, {backgroundColor: darkMode ? 'black' : ''}]}>
            <View style={{flexDirection:'row', gap: 16,marginBottom: 20,}}>
            <Pressable onPress={()=>{router.push('/notes')}} style={{alignSelf:'center', flexDirection:'row', alignItems:'center', gap: 18}}>
            <Text style={[styles.sidetitle, styles.text,{color: darkMode? "white": colors.secondry}]}>Latest Notes</Text>
                <Text style={[]}>
                <FontAwesome name='arrow-right' size={24} style={{color: darkMode? "white": colors.secondry}}/>
                </Text>
            </Pressable>
            </View>
            {latestNotes.length > 0 && <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.notes}>
                {latestNotes.map((note)=>(
                    <Pressable onPress={()=>{router.push(`/note/${note.id}`)}} key={note.id} style={styles.note}>
                        <Text style={[styles.title,{fontSize:25, color: "black"}, styles.text]}>{note.title}</Text>
                        <Text style={[styles.text,styles.content, {color: colors.dark}]}>{note.content}</Text>
                    </Pressable>
                ))}

            </ScrollView>}
            {latestNotes.length === 0 &&(
                <View style={{alignSelf:'center', justifyContent:"center", marginTop:60}}>
                    <Text style={[styles.text,{fontSize:20, color:darkMode?"white":colors.secondry}]}>there is no notes yet. 
                    </Text>
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    text:{
        fontFamily: fonts.main,
    },
    seccomponent:{
        padding:10,
        minHeight: 300,
    },
    sidetitle:{
        fontSize:32,
        color: colors.secondry
    },
    notes:{
        flex:1,
        flexDirection:'row',
        flexGrow:12,
        gap: 12,
        marginVertical: 12
    },
    note:{
        borderColor:colors.dark,
        borderWidth: 1,
        padding:10,
        width:190,
        height:100,
        overflow:'hidden',
        borderRadius:8,
        backgroundColor: colors.primary,
        marginHorizontal: 8,
    },
    title:{
        maxHeight:35,
        marginBottom: 6,
        overflow:'hidden'
    },
    content:{
        maxHeight:40,
        overflow:'hidden'
    }
});