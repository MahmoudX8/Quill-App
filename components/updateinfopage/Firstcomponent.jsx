import { View, Text,TextInput, Pressable, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { supabase } from "../../lib/supabase";
import { useRouter } from 'expo-router';
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import fonts from '@/assets/fonts/fonts';
import colors from '@/assets/colors/colors';

const Firstcomponent = () => {
      const [loading , setLoading] = useState(false);
      const [fname , setFname] = useState('');
      const [lname , setLname] = useState('');
      const [pass , setPass] = useState('');
      const [err , setErr] = useState('');
      const [msg , setMsg] = useState('');
      const [showpass,setShowpass] = useState(false);
      const router = useRouter();
      const {darkMode} = useTheme();
      const hasSpace = (str) => /\s/.test(str);
      const sqlInjectionPattern = /['";\\<>-]|--|\/\*|\*\/|\b(select|insert|update|delete|drop|union|exec)\b/i;
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

const handleUpdate = async () => {
  setLoading(true);
  setErr('');
  setMsg('');
  if (!fname || !lname) {
    setErr('First and last name are required');
    setLoading(false);
    return;
  }
  if (hasSpace(fname) || hasSpace(lname) || (pass && hasSpace(pass))) {
    setErr('First name, last name and password cannot contain spaces');
    setLoading(false);
    return;
  }

  if (sqlInjectionPattern.test(fname) || sqlInjectionPattern.test(lname)) {
    setErr('Names contain invalid characters');
    setLoading(false);
    return;
  }
  const updatePayload = { data: { full_name: `${fname} ${lname}` } };
  if (pass) updatePayload.password = pass;
  const { data, error } = await supabase.auth.updateUser(updatePayload);
  if (error) {
    setLoading(false);
    setErr('Invalid Credentials');
    return;
  }
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ full_name: `${fname} ${lname}` })
    .eq('id', data.user.id);
  setLoading(false);
  if (profileError) {
    setErr('Profile updated, but syncing your name failed');
    return;
  }
  setMsg('Profile updated successfully.');
  setTimeout(() => {
    router.replace('/profile');
  }, 1000);
}
  return (
    <View style={[styles.container,{}]}>
      <Pressable style={{width:22}} onPress={()=>{router.push('/profile')}}>
        <FontAwesome name='arrow-left' color={colors.primary} size={20}/>
        </Pressable>
      <View style={[styles.form,{}]}>
            <Text style={[styles.text, styles.title,{}]}>Update Profile</Text>
            <Text style={{color:'grey', marginBottom:8}}>email & username can't be changed</Text>
            {!!msg &&
            <View style={{backgroundColor:'#b8ffa6ff',width:300,alignItems:'center', height:22, borderRadius:8}}>
              <Text style={{color:'#229e00ff', textAlign:'center'}}>{msg}</Text>
            </View>
            }
            {!!err &&
            <View style={{backgroundColor:'#ff9999ff', width:300,alignItems:'center', borderRadius:8, padding:4}}>
              <Text style={{color:'#ab0000ff', textAlign:'center'}}>{err}</Text>
            </View>
            }
            <View style={[styles.inputcontainer]}>
                <TextInput
                placeholder="First Name"
                style={[styles.input,{backgroundColor:darkMode?'#3c3c3cff':colors.input,color: darkMode?'white':'black',borderTopLeftRadius:8, borderTopEndRadius:8,},]}
                onChangeText={setFname}
                />
                <TextInput
                placeholder="Last Name"
                style={[styles.input,{backgroundColor:darkMode?'#3c3c3cff':colors.input,color: darkMode?'white':'black',},]}
                onChangeText={setLname}
                />
                <TextInput
                placeholder="Password"
                style={[styles.input,{backgroundColor:darkMode?'#3c3c3cff':colors.input, paddingRight:35,color: darkMode?'white':'black'} ,]}
                secureTextEntry={showpass?false:true}
                onChangeText={setPass}
                />
                <Pressable style={{position:'absolute', top:120, right:10, zIndex:99}} onPress={()=>{setShowpass(!showpass)}}>
                <FontAwesome name='eye-slash' style={{}} size={15} color={'black'}/>
                </Pressable>
                <Pressable style={[styles.btn,{}]} onPress={handleUpdate} disabled={loading}>
                    <Text style={[styles.text,{textAlign:'center', fontWeight:'bold'}]}>{loading ? "..." : "Update"}</Text>
                </Pressable>
            </View>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    padding:20,
    paddingVertical:50,
    gap:12,
    // backgroundColor:'purple'
  },
  text:{
    fontFamily: fonts.main,
  },
  title:{
    fontSize:40,
    color: colors.primary,
    marginBottom:20
  },
  form:{
    alignItems:'center',
    gap:5,
    // backgroundColor:'skyblue'
  },
  input:{
    height:50,
    paddingHorizontal:12,
    fontSize:14,
    width:300,
  },
  btn:{
    backgroundColor:colors.primary,
    padding:12,
    fontFamily:fonts.main,
    borderEndEndRadius:8,
    borderEndStartRadius:8,
  }
})
export default Firstcomponent