import {View,Text,StyleSheet,TextInput,Pressable,Button,} from "react-native";
import React, { useState } from "react";
import fonts from "@/assets/fonts/fonts";
import colors from "@/assets/colors/colors";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { addNote } from "../../storage/storage.js";
import Toast from "react-native-toast-message";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useNetwork } from "../../contexts/NetworkContext.jsx";
import { supabase } from "../../lib/supabase.js";
import { useRouter } from "expo-router";

const Secondcomponent = () => {
  const { darkMode } = useTheme();
  const {session} = useAuth();
  const {isConnected} = useNetwork();
  const router = useRouter();
  const [err,setErr]=useState('');
  const tagElements = [
    {
      title: "Thoughts",
    },
    {
      title: "Memories",
    },
    {
      title: "Plans",
    },
    {
      title: "Ideas",
    },
  ];
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [inputTag, setInputTag] = useState("");
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    if (!inputTitle || !inputContent || !inputTag) {
      setErr("you should input all the fields");
      return;
      // Toast.show({
      //   type: "error",
      //   text1: "Input Error",
      //   text2: "you should input all the fields",
      //   text1Style: {
      //     fontFamily: fonts.main,
      //     fontSize: 16,
      //     fontWeight: "bold",
      //   },
      //   text2Style: { fontFamily: fonts.main },
      // });
    };
    if(!isConnected && session){
        setErr('please connect to internet first !');
        return;
        };
    setLoading(true);
    const newNote = {
      title: inputTitle,
      content: inputContent,
      type: inputTag,
      created_at: Date.now().toString(),
      updated_at: Date.now().toString(),
    };
    try {
      if (session) {
        //user authenticated
        const { error } = await supabase.from('notes').insert({title:inputTitle, content: inputContent, type: inputTag, user_id: session.user.id});
        if(error) throw error;
        router.push('/notes');
      }else{
        //guest user
        const res = await addNote(newNote);
        router.push('/notes');
        if (res) {
          // Toast.show({
          //   type: "success",
          //   text1: "Success",
          //   text2: "note added successfully",
          //   text1Style: {
          //     fontFamily: fonts.main,
          //     fontSize: 16,
          //     fontWeight: "bold",
          //   },
          //   text2Style: { fontFamily: fonts.main },
          // });
          setInputTitle("");
          setInputContent("");
        }
      }
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false);
    }
  };
  return (
    <>
      {/* <Toast /> */}
      <View style={[styles.container]}>
        {!!err &&(
              <View style={{}}>
                <Text style={{color:'#700000ff', backgroundColor:'#ff9c9cff', padding:5, textAlign:'center'}}>{err}</Text>
              </View>
        )}
        <View style={styles.tagcontainer}>
          {tagElements.map((e, i) => (
            <View
              key={i}
              style={[
                styles.tag,
                { backgroundColor: inputTag == e.title ? colors.primary : "" },
              ]}
            >
              <Pressable onPress={() => setInputTag(e.title)}>
                <Text
                  style={{
                    color: inputTag == e.title ? "white" : colors.darkshadow,
                  }}
                >
                  {e.title}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
        <View style={styles.inputcontainer}>
          <TextInput
            placeholder="Title"
            style={[
              styles.title,
              styles.input,
              {
                backgroundColor: darkMode ? "#3e3e3eff" : colors.input,
                color: darkMode ? "white" : "",
              },
            ]}
            onChangeText={setInputTitle}
          />
          <TextInput
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
            placeholder="Write note..."
            style={[
              styles.note,
              styles.input,
              {
                backgroundColor: darkMode ? "#3e3e3eff" : colors.input,
                color: darkMode ? "white" : "",
              },
            ]}
            onChangeText={setInputContent}
          />
          
          <View
            style={[
              {
                height: 150,
                width: 100,
                alignSelf: "center",
                borderRadius: 4,
                overflow: "hidden",
                padding: 22,
              },
            ]}
          >
            
            <Pressable
              onPress={onSave}
              style={styles.btn}
            ><Text style={[styles.text, {color:'white'}]}>Save</Text></Pressable>
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    gap: 15,
    flex: 1,
    height: 800,
  },
  text: {
    fontFamily: fonts.main,
    color: colors.secondry,
  },
  subtitle: {
    marginVertical: 10,
    fontSize: 40,
  },
  inputcontainer: {
    height: 400,
    borderRadius: 6,
  },
  input: {
    backgroundColor: colors.input,
    padding: 12,
    color: colors.dark,
  },
  title: {
    fontSize: 20,
    borderRadius: 6,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  note: {
    height: 300,
    width: 350,
    fontSize: 14,
  },
  tagcontainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    margin: 10,
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.darkshadow,
    padding: 8,
    borderRadius: 6,
  },
  btn: {
    backgroundColor: colors.primary,
    alignItems:'center',
    padding:8,
    borderRadius:5,

  },
});
export default Secondcomponent;
