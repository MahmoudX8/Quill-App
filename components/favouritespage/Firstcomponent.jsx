import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '@/assets/colors/colors.js';
import fonts from '@/assets/fonts/fonts.js';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "../../contexts/ThemeContext";
import { getFavoriteNotes, removeFromFav } from "../../storage/storage.js";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from 'expo-router';

const Firstcomponent = () => {
  const { darkMode } = useTheme();
  const [favNotes, setFavNotes] = useState([]);
  const [loading, setLoading] = useState('');
  const {loading:authloading ,session} = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      if (authloading) return;
      setLoading(true);
      if (session) {
        const{data , error} = await supabase.from('notes').select('id,title,content,type').eq('is_favorite',true).eq('user_id',session.user.id);
        setLoading(false);
        if (error) {
          console.log(error);
          return;
        }
        setFavNotes(data);
      } else {
        const notes = await getFavoriteNotes();
        setLoading(false);
        setFavNotes(notes);
      }
    };
    fetchNotes();
  }, [session, authloading]);

  const removefav = async (id) => {
    // setLoading(true);
    if (session) {
      const {error} = await supabase.from('notes').update({is_favorite:false}).eq('id', id);
      setLoading(false);
          if (error) {
            console.log(error);
            return;
          }
      setFavNotes(prev => prev.filter(item => item.id !== id));
    }else{
        await removeFromFav(id);
        setLoading(false);
        setFavNotes(prev => prev.filter(item => item.id !== id));
    }
  };
  if (loading) {
    return(
      <ActivityIndicator animating={loading} color={colors.primary} size={'large'} style={{position:'absolute',top:'50%', left:'50%'}}/>
    )
  }
  return (
    <FlatList
      data={favNotes}
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <Text style={{ color: darkMode ? "white" : "black", fontFamily: fonts.main, textAlign: 'center', marginTop: 200 }}>
          There is no favorite notes yet
        </Text>
      }
      renderItem={({ item }) => (
        <Pressable style={styles.note} onPress={()=>{router.push(`/note/${item.id}`)}}>
          <Pressable style={{ zIndex: 99 }} onPress={() => removefav(item.id)}>
            <Ionicons name={'remove-circle-sharp'} color={colors.darkshadow} size={22} style={{ position: 'absolute', right: 4, top: 4 }} />
          </Pressable>
          <Text style={[styles.notetitle, styles.text]}>{item.title}</Text>
          <Text style={[styles.type, styles.text]}>{item.type}</Text>
          <Text style={[styles.content, styles.text]}>{item.content}</Text>
        </Pressable>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 40,
    paddingBottom: 200,
  },
  text: { fontFamily: fonts.main, color: colors.dark },
  title: { marginVertical: 10, fontSize: 40 },
  note: {
    borderWidth: 1,
    borderColor: colors.dark,
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    height: 100,
    overflow: 'hidden',
    minWidth: 300,
  },
  notetitle: { 
    fontWeight: 'bold',
    fontSize: 24,
    maxWidth:250,
    maxHeight:40,
    overflow:'hidden',
  },
  content: { maxWidth: 200, maxHeight: 50, overflow: 'hidden' },
  type: {
    backgroundColor: colors.midshadow,
    maxWidth: 100,
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 4,
    color: colors.primary,
    borderTopLeftRadius: 8,
    borderRightRadius: 8,
  }
});

export default Firstcomponent