import { View, Text,ActivityIndicator, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import {  useRouter } from 'expo-router'
import colors from '@/assets/colors/colors';
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import fonts from '@/assets/fonts/fonts';
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { editNote } from "../../storage/storage";
const Secondcomponent = ({note, fetchLoading}) => {
    const {darkMode} = useTheme();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const {session} = useAuth();
    const router = useRouter();
    useEffect(()=>{
        if (!fetchLoading && note) {
            setTitle(note.title);
            setContent(note.content);
            setTag(note.type);
        }
    },[fetchLoading, note]);
    if (fetchLoading) {
        return(
            <ActivityIndicator size={'large'} color={colors.primary} animating={fetchLoading} style={{position:'absolute',top:200, left:'50%'}}/>
        )
    };
    if (!note) {
        return(
            <View>
                <Text>not found note</Text>
            </View>
        )
    };
    const handleDate = (datetime)=>{
        let date = datetime[0];
        let time = datetime[1];
        let day = date.split('-')[2];
        let intmonth = date.split('-')[1];
        let year = date.split('-')[0];
        let month;
        if (day[0] == '0') day = day[1];
        switch (intmonth) {
            case '01':
                month = 'January'
                break;
            case '02':
                month = 'February'
                break;
            case '03':
                month = 'March'
                break;
            case '04':
                month = 'April'
                break;
            case '05':
                month = 'May '
                break;
            case '06':
                month = 'June'
                break;
            case '07':
                month = 'July'
                break;
            case '08':
                month = 'August'
                break;
            case '09':
                month = 'September'
                break;
            case '10':
                month = 'October'
                break;
            case '11':
                month = 'November'
                break;
            case '12':
                month = 'December'
                break;
            default:
                month= 'error'
                break;
        };
        return(
            `${day} ${month} ${year}`
        );
    };
    const tagElements = [
    { title: 'Thoughts' },
    { title: 'Memories' },
    { title: 'Plans' },
    { title: 'Ideas' },
    ];
    const handleEdit = async()=>{
        try {
            if (title === note.title && content === note.content && tag === note.type) {
                console.log(`you didn't change anything` );
                router.push('/notes');
                return;
            };
            if(!title || !content || !tag){
                setErr('you have to input all fields');
                return;
            };
            setLoading(true);
            const updatedNote={
                title: title,
                content: content,
                type: tag,
                updated_at: Date.now()
            }
            if (session) {
                const {error} = await supabase.from('notes').update({title: title, content: content, type:tag, updated_at: new Date().toISOString()}).eq('id',note.id);
                if (error) {
                    setErr('error while editing note');
                    return;
                }else{
                    router.push('/notes');
                    return;
                }
            }else{
                await editNote(note.id, updatedNote);
            }
        } catch (error) {
            setErr(error.message);
        }finally{
            setLoading(false);
        }
    }
  return (
    <View style={styles.container}>
    <View style={{marginVertical: 12, marginBottom:20}}>
      <Text style={{color:'grey'}}>{handleDate(note.created_at.split('T'))}</Text>

    </View>
      <View style={{flexDirection:"row", gap:12, marginBottom:20}}>
      {tagElements.map((item,index)=>(
        <Pressable key={index} onPress={()=>{setTag(item.title)}} style={{backgroundColor: tag == item.title ? colors.primary : '',padding:4, borderRadius:8, borderWidth:2,borderColor:colors.primary}}>
            <Text style={[styles.text,{color: tag == item.title ? colors.secondry : colors.primary}]}>{item.title}</Text>
        </Pressable>
      ))}

      </View>
      <TextInput value={title} onChangeText={setTitle} placeholder='Title'  style={[styles.input,styles.title,{backgroundColor: darkMode ? '#4f4f4fff' : colors.input ,}]}/>
      <TextInput value={content} onChangeText={setContent} placeholder='write note...' multiline={true} numberOfLines={6} textAlignVertical="top" style={[styles.input, styles.content,{backgroundColor: darkMode ?  '#4f4f4fff' : colors.input ,}]}/>
      <Pressable style={{backgroundColor:colors.primary, padding: 6, borderRadius:5, marginTop:20}}>
        <Text style={[styles.text,{color:colors.secondry}]} onPress={handleEdit}>save</Text>
        {!!err && <View style={{backgroundColor:'#ff9898ff', padding:5, }}><Text style={{color:'red'}}>{err}</Text></View>}
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        textAlign: 'center'
    },
    text:{
        fontFamily: fonts.main,
    },
    input:{
        width:350,
        padding:5,
        borderRadius:5,
        marginBottom:4,
    },
    title:{
        fontSize:20
    },
    content:{
        minHeight:250
    }
})
export default Secondcomponent