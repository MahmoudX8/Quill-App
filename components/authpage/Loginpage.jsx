import { View, Text,TextInput, Pressable, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import colors from '@/assets/colors/colors'
import { supabase } from "../../lib/supabase";
import { useRouter } from 'expo-router';
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import fonts from '@/assets/fonts/fonts';
import { useTheme } from '../../contexts/ThemeContext';
import { useNetwork } from '../../contexts/NetworkContext';

const Loginpage = () => {
    const [loading , setLoading] = useState(false);
    const [email , setEmail] = useState('');
    const [pass , setPass] = useState('');
    const [err , setErr] = useState('');
    const [msg , setMsg] = useState('');
    const [showpass , setShowpass] = useState(false);
    const router = useRouter();
    const {darkMode} = useTheme();
    const {isConnected} = useNetwork();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasSpace = (str) => /\s/.test(str);
    const sqlInjectionPattern = /['";\\<>-]|--|\/\*|\*\/|\b(select|insert|update|delete|drop|union|exec)\b/i;
    const handleLogin = async () => {
        if (!isConnected) {
         setErr('you should connect to internet');
         return;
        }
        setLoading(true);
        setErr('');
        setMsg('');
        if (!email || !pass) {
            setErr('you have to input all fields');
            setLoading(false);
            return;
        }
        if (hasSpace(email)|| hasSpace(pass)) {
            setErr('Email and password cannot contain spaces');
            setLoading(false);
            return;
        }
        if (!emailRegex.test(email)) {
            setErr('Please enter a valid email address');
            setLoading(false);
            return;
        }
        if (sqlInjectionPattern.test(email)) {
            setErr('Email contain invalid characters');
            setLoading(false);
            return;
        }
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });
        setLoading(false);
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          setErr('Account already exists.');
          return;
        }
        if (error) {
          setErr(`Invalid Credentials`);
          return;
        }
        setMsg('logged In successfully.');
        setTimeout(() => {
          router.replace('/');
        }, 1000);
    };
  return (
    <>
    <View style={[styles.container,{}]}>
        <Pressable style={{width:22}} onPress={()=>{router.push('/profile')}}>
        <FontAwesome name='arrow-left' color={colors.primary} size={20}/>
        </Pressable>
        <View style={[styles.form,{}]}>
            <Text style={[styles.text, styles.title]}>Sign In</Text>
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
                placeholder="Email"
                style={[styles.input,{backgroundColor:darkMode?'#3c3c3cff':colors.input, borderTopLeftRadius:8, borderTopEndRadius:8, color: darkMode?'white':'black'},]}
                onChangeText={setEmail}
                />
                <TextInput
                placeholder="Password"
                style={[styles.input,{backgroundColor:darkMode?'#3c3c3cff':colors.input, paddingRight:35,color: darkMode?'white':'black'} ,]}
                secureTextEntry={showpass?false:true}
                onChangeText={setPass}
                />
                <Pressable style={{position:'absolute', top:70, right:10, zIndex:99}} onPress={()=>{setShowpass(!showpass)}}>
                <FontAwesome name='eye-slash' style={{}} size={15} color={'black'}/>
                </Pressable>
                <Pressable style={[styles.btn,{}]} onPress={handleLogin} disabled={loading}>
                    <Text style={[styles.text,{textAlign:'center', fontWeight:'bold'}]}>{loading ? "..." : "Login"}</Text>
                </Pressable>
            </View>
                <Pressable style={{padding:12}} onPress={()=>{router.push("/signup")}} disabled={loading}>
                    <Text style={{color:"grey"}}>don't have an account?</Text>
                </Pressable>
                <Pressable style={{padding:12}} onPress={()=>{router.push("/forgetpassword")}} disabled={loading}>
                    <Text style={{color:'grey'}}>Forgot Password</Text>
                </Pressable>
        </View>
    </View>
    </>
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
    marginBottom:30
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
export default Loginpage