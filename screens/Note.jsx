import { View, Text, ScrollView, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Firstcomponent from '../components/notepage/Firstcomponent';
import Secondcomponent from '../components/notepage/Secondcomponent';
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { getNote } from "../storage/storage";


const Note = ({id}) => {
    const {session, loading:authloading} = useAuth();
    const [note,setNote] = useState(null);
    const [fetchLoading,setFetchLoading] = useState(false);
    const {darkMode} = useTheme();
    useEffect(()=>{
        if (authloading) return;
        const fetchNotesFromDB = async ()=>{
            setFetchLoading(true);
            const {data,error} = await supabase.from('notes').select().eq('id', id).single();
            setFetchLoading(false);
            if (error) {
                console.log(error);
                return;
            }else{
                setNote(data);
            }
        };
        const fetchNotesFromAsyncStorage = async ()=>{
            const thenote = await getNote(id);
            if (thenote) {
                setNote(thenote);
            }else{
                return;
            }
        };
        if (session) {
            fetchNotesFromDB();
        } else {
            fetchNotesFromAsyncStorage();
        }
    },[id,session, authloading]);
  return (
    <>
    <View style={{flex:1,backgroundColor:darkMode?'black':''}}>
        <StatusBar hidden/>
      <Firstcomponent note={note}/>
      <ScrollView style={{flex:1}}>
        <Secondcomponent note={note} fetchLoading={fetchLoading}/>
      </ScrollView>
    </View>
    </>
  )
}

export default Note