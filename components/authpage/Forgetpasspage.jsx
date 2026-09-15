import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import fonts from '@/assets/fonts/fonts';
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import colors from '@/assets/colors/colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { supabase } from "../../lib/supabase";
import { useAuth } from '../../contexts/AuthContext';
import { useNetwork } from '../../contexts/NetworkContext';

const Forgetpasspage = () => {
    const {darkMode} = useTheme();
    const [codeSent, setCodeSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('');
    const [msg, setMsg] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const router = useRouter();
    const {isConnected} = useNetwork();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasSpace = (str) => /\s/.test(str);
    const sqlInjectionPattern = /['";\\<>-]|--|\/\*|\*\/|\b(select|insert|update|delete|drop|union|exec)\b/i;
    const handleGetCode = async ()=>{
        if(!isConnected){
            setErr('you should connect to internet');
            return;
        }
        if(!email){
            setErr('you have to input your email');
            return;
        }
        if (hasSpace(email)) {
            setErr('Email cannot contain spaces');
            return;
        }
        if (!emailRegex.test(email)) {
            setErr('Please enter a valid email address');
            return;
        }
        if (sqlInjectionPattern.test(email)) {
            setErr('Email contain invalid characters');
            return;
        }
        try {
            setErr('');
            setMsg('');
            const {error} = await supabase.auth.resetPasswordForEmail(email);
            if (error) {
                console.log(error.message);
                setErr(error.message);
                return;
            };
            setMsg('code has been sent successfully. check your email.')
            setCodeSent(true);
        } catch (error) {
            setErr(error.message);
            console.log(error.message);
        }finally{
            setLoading(false);
        }
    };
    const handleConfirm = async ()=>{
        try {
            setLoading(true);
            setErr('');
            setMsg('');
            if (!verified) {
                if (!otp) {
                    setErr('enter code first');
                    return;
                };
                const {error} = await supabase.auth.verifyOtp({
                    email: email,
                    token: otp,
                    type: 'recovery'
                });
                if (error) {
                    setMsg('invalid/expired code');
                    return;
                }
                setVerified(true);
            }else{
                if (!newPassword) {
                    setErr('you have to enter your new password');
                    return;
                }
                if (hasSpace(newPassword)) {
                    setErr('password cannot contain spaces');
                    return;
                }
                const { error } = await supabase.auth.updateUser({password: newPassword});
                if (error) {
                    setErr(error.message);
                };
                setMsg('password has been reset sucessfully');
                router.replace('/profile');
            }
        } catch (error) {
            console.log(error.message);
            setErr(error.message);
        }finally{
            setLoading(false);
        }
    }

  return (
    <View style={[styles.container]}>
        <Pressable onPress={()=>{router.back()}}>
        <FontAwesome name='arrow-left' color={colors.primary} size={20}/>
        </Pressable>
      <View style={[styles.form]}>
      <Text style={[styles.title, styles.text]}>Forget Password</Text>
        {!!msg &&
            <View style={{backgroundColor:'#b8ffa6ff',width:300,alignItems:'center', height:22, borderRadius:8, marginBottom:12}}>
              <Text style={{color:'#229e00ff', textAlign:'center'}}>{msg}</Text>
            </View>
        }
        {!!err &&
            <View style={{backgroundColor:'#ff9999ff', width:300,alignItems:'center', borderRadius:8, padding:4, marginBottom:12}}>
              <Text style={{color:'#ab0000ff', textAlign:'center'}}>{err}</Text>
            </View>
        }
      <TextInput style={[styles.input ,{backgroundColor: darkMode ? '#303030ff' : colors.input, color: codeSent ? 'grey': (darkMode?'white':'black') }]} placeholder='Enter your Email' onChangeText={setEmail} editable={!codeSent && !verified}/>
      <TextInput style={[styles.input ,{backgroundColor: darkMode ? '#303030ff' : colors.input , color:codeSent?(darkMode?'white':'black') :'grey' }]} placeholder='Enter received code' keyboardType='numeric' editable={codeSent && !verified} onChangeText={setOtp}/>
      {verified && (
          <TextInput
            style={[styles.input, { backgroundColor: darkMode ? '#303030ff' : colors.input, color: darkMode ? 'white' : 'black' }]}
            placeholder='Enter new password'
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        )}

      <View style={{flexDirection:'row', gap:12}}>
      <Pressable disabled={codeSent || loading} style={{backgroundColor:codeSent? 'grey':colors.primary, padding:8, borderRadius:6}} onPress={handleGetCode}>
        <Text style={[styles.text, {color: codeSent ? 'white': colors.secondry}]}>get code</Text>
      </Pressable>
      <Pressable disabled={!codeSent || loading} style={{backgroundColor:codeSent ?colors.primary : 'grey', padding:8, borderRadius:6}} onPress={handleConfirm}>
        <Text style={[styles.text, {color: codeSent ? colors.secondry : 'white'}]}>{verified? 'set password' : 'confirm'}</Text>
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
    },
    form:{
        width: 400,
        alignItems:'center',
        alignSelf:'center',
    },
    text:{
        fontFamily: fonts.main
    },
    title:{
        fontSize: 35,
        color: colors.primary,
        marginBottom: 20,
    },
    input:{
        padding: 8,
        borderRadius:6,
        width:300,
        marginBottom: 12,
    }
});
export default Forgetpasspage