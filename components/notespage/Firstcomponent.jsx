import { View, Text, FlatList, StyleSheet, Pressable, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getNotes } from '../../storage/storage.js'
import colors from '@/assets/colors/colors.js';
import fonts from '@/assets/fonts/fonts.js';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "../../contexts/ThemeContext";
import { addToFav, removeFromFav, getFavoriteNotesIds } from "../../storage/storage.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { supabase } from "../../lib/supabase.js";
import { useRouter } from 'expo-router';
const Firstcomponent = () => {
  const [notes, setNotes] = useState([]);
  const { darkMode } = useTheme();
  const [chosenFilter, setChosenFilter] = useState('Latest');
  const [emptyMsg, setEmptyMsg] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [favIds, setFavIds] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const {loading: authloading, session} = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getAllNotes = async () => {
      if (authloading) return;
      setLoading(true);
      if (session) {
        const {data, error} = await supabase.from('notes').select().eq('user_id', session.user.id);
        setLoading(false);
        if(error){
          console.log(error);
          return;
        }
        setNotes(data);
      }else{
        const thenotes = await getNotes();
        setLoading(false);
        setNotes(thenotes);
      }
    }
    getAllNotes();
  }, [session,authloading]);
  useEffect(() => {
    const fetchids = async () => {
      if (authloading) return;
      setLoading(true);
      if (session) {
        const {data, error} = await supabase.from('notes').select('id').eq('is_favorite',true);
        setLoading(false);
        if (error) {
          console.log(error);
          return;
        };
        setFavIds(data.map(n=>n.id));
      } else {
        const fetched = await getFavoriteNotesIds();
        setLoading(false);
        setFavIds(fetched);
      }
    };
    fetchids();
  }, [authloading,session]);
  const getTimestamp = (item) => {
  const raw = item.updated_at ? item.updated_at : item.created_at;
  return session ? new Date(raw).getTime() : raw;
};
useEffect(() => {
  let sorted = [...notes];
  if (selectedTags.length > 0) {
    sorted = sorted.filter(item => selectedTags.includes(item.type));
  }
  switch (chosenFilter) {
    case 'Oldest':
      sorted = sorted.sort((a, b) => getTimestamp(a) - getTimestamp(b));
      break;
    case 'Latest':
      sorted = sorted.sort((a, b) => getTimestamp(b) - getTimestamp(a));
      break;
    case 'Longest':
      sorted = sorted.sort((a, b) => b.content.length - a.content.length);
      break;
    case 'Shortest':
      sorted = sorted.sort((a, b) => a.content.length - b.content.length);
      break;
    default:
      break;
  }
  if (query !== "") {
    sorted = sorted.filter(item => item.title.includes(query));
  }
  setFilteredNotes(sorted);
  handleEmpty(sorted);
}, [chosenFilter, query, notes, selectedTags]);

  const addFav = async (id) => {
    if (session) {
      const {error} = await supabase.from('notes').update({is_favorite:true}).eq('id', id);
      if (error) {
        console.log(error);
        return;
      }
      setFavIds(prev => [...prev, id]);
    }else{
    await addToFav(id);
    setFavIds(prev => [...prev, id]);
  }
  };
  const removeFav = async (id) => {
    if (session) {
      const {error} = await supabase.from('notes').update({is_favorite:false}).eq('id', id);
      if (error) {
        console.log(error);
        return;
      }
      setFavIds(prev => prev.filter(item => item != id));
    }else{
    await removeFromFav(id);
    setFavIds(prev => prev.filter(item => item != id));
  }
  };
  const filterElements = [
    { title: 'Latest' },
    { title: 'Oldest' },
    { title: 'Longest' },
    { title: 'Shortest' },
  ];
  const tagElements = [
    { title: 'Thoughts' },
    { title: 'Memories' },
    { title: 'Plans' },
    { title: 'Ideas' },
  ];
  const handleEmpty = (list) => {
    if (notes.length === 0) {
      setEmptyMsg("There is no notes yet");
    } else if (query.length > 0 && list.length === 0) {
      setEmptyMsg("No matched notes");
    } else {
      setEmptyMsg("");
    }
  };
  const handleTime = (createdAt) => {
    let timeInMS;
    if (session) {
      timeInMS = new Date(createdAt).getTime();
    }else{
      timeInMS = createdAt;
    }
    const time = (Date.now() - timeInMS) / 1000;
    if (time < 60) return "Just now";
    if (time < 3600) return `${Math.floor(time / 60)}m`;
    if (time < 3600 * 24) return `${Math.floor(time / 3600)}h`;
    if (time < 3600 * 24 * 7) return `${Math.floor(time / (3600 * 24))}d`;
    if (time < 3600 * 24 * 7 * 4) return `${Math.floor(time / (3600 * 24 * 7))}w`;
    if (time < 3600 * 24 * 7 * 4 * 12) return `${Math.floor(time / (3600 * 24 * 7 * 4))}mo`;
    return `${Math.floor(time / (3600 * 24 * 7 * 4 * 12))}y`;
  };

return (
  <View style={{ flex: 1, backgroundColor: darkMode ? "black" : "white" }}>
    <FlatList
      data={filteredNotes}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <>
          <Text style={[styles.subtitle, styles.text, { color: darkMode ? "white" : colors.secondry }]}>
            My Notes
          </Text>
          <View style={styles.subtitlecontainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <TextInput
                style={[styles.search, { backgroundColor: darkMode ? "#3e3e3eff" : colors.input, color: darkMode ? "white" : "black" }]}
                placeholder='Search...'
                onChangeText={setQuery}
              />
              <Pressable onPress={() => setIsFilter(!isFilter)}>
                <Ionicons name='filter-outline' color={darkMode ? "white" : "black"} size={20} />
              </Pressable>
            </View>
          </View>
          <View style={styles.tagscontainer}>
            {tagElements.map((e, i) => (
              <View key={i}>
                <Pressable onPress={() => {
                  if (selectedTags.includes(e.title)) {
                    setSelectedTags(prev => prev.filter(item => item !== e.title));
                  } else {
                    setSelectedTags(prev => [...prev, e.title]);
                  }
                }}>
                  <Text style={[styles.text, { backgroundColor: selectedTags.includes(e.title) ? colors.primary : '', color: colors.darkshadow, padding: 4, borderColor: colors.darkshadow, borderWidth: 1, fontSize: 15, borderRadius: 4 }]}>
                    {e.title}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
          {loading &&(
                <View>
                  <ActivityIndicator color={colors.primary} size={'large'} animating={loading} style={{position:'absolute', top:200, left:'50%'}}/>
                </View>
              )}
        </>
      }
      ListEmptyComponent={
        (emptyMsg && !loading) ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.text, { color: darkMode ? "white" : "black", paddingVertical: 100 }]}>
              {emptyMsg}
            </Text>
          </View>
        ) : null
      }
      renderItem={({ item }) => (
        <Pressable style={styles.note} onPress={()=>{router.push(`/note/${item.id}`)}}>
          <Pressable onPress={() => (favIds.includes(item.id) ? removeFav(item.id) : addFav(item.id))} style={{ zIndex: 99 }}>
            <Ionicons name={favIds.includes(item.id) ? 'heart' : 'heart-outline'} color={colors.darkshadow} size={22} style={{ position: 'absolute', right: 10, top: 6 }} />
          </Pressable>
          <Text style={[styles.title, styles.text]}>{item.title}</Text>
          <Text style={[styles.date, styles.text, { color: colors.darkshadow, position: 'absolute', right: 20, top: 40 }]}>
            {handleTime(item.updated_at ? item.updated_at:item.created_at )}
          </Text>
          <Text style={[styles.content, styles.text]}>{item.content}</Text>
          <Text style={[styles.type, styles.text]}>{item.type}</Text>
        </Pressable>
      )}
    />

    {isFilter && (
      <View style={styles.filtercontainer}>
        {filterElements.map((e, i) => (
          <Pressable key={i} onPress={() => setChosenFilter(e.title)}>
            <Text style={[styles.filterelement, { color: e.title == chosenFilter ? colors.primary : 'grey' }]}>
              {e.title}
            </Text>
          </Pressable>
        ))}
      </View>
    )}
  </View>
)
}

const styles = StyleSheet.create({
  text: { fontFamily: fonts.main },
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
    gap: 12,
    paddingBottom: 200,
  },
  subtitle: { marginVertical: 10, fontSize: 40, color: colors.secondry, alignSelf:'center' },
  subtitlecontainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  search: {
    width: 300,
    fontFamily: fonts.main,
    borderColor: colors.dark,
    backgroundColor: colors.input,
    padding: 8,
    borderRadius: 5,
  },
  note: {
    borderWidth: 1,
    borderColor: colors.dark,
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    height: 100,
    overflow: 'hidden',
    width: 300,
  },
  title: { fontWeight: 'bold', fontSize: 24, maxHeight: 40, maxWidth: 210, overflow:'hidden' },
  filtercontainer: {
  backgroundColor: colors.dark,
  position: 'absolute',
  top: 160,
  zIndex: 999,
  elevation: 10,
  padding: 5,
  width: 200,
  right: 110,
  alignItems: 'center',
  borderRadius: 10,
  boxShadow: [{ color: "#3a3a3aae", offsetX: 4, offsetY: 8, blurRadius: 8 }],
  },
  filterelement: { 
    margin: 5,
    fontSize: 18,
    fontFamily: fonts.main,
    color: 'grey',
    width:170,
    textAlign:'center'

   },
  tagscontainer: {
    marginBottom: 8,
    alignSelf: 'center',
    height: 60,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
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

export default Firstcomponent;