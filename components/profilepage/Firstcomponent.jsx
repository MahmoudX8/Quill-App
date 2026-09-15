import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import fonts from '@/assets/fonts/fonts';
import colors from '@/assets/colors/colors';
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNetwork } from "../../contexts/NetworkContext";
import { useRouter } from "expo-router";
import { supabase } from '../../lib/supabase';
const Firstcomponent = () => {
    const {darkMode} = useTheme();
    const {session , loading} = useAuth();
    const [profile, setProfile] = useState(null);
    const [err, setErr] = useState('');
    const router = useRouter();
    const {isConnected} = useNetwork();
    useEffect(()=>{
      if(!session) return;
      if(!isConnected) return;
      supabase.from('profiles').select().eq('id', session.user.id).single().then(({data, error})=>{
        if (!error) setProfile(data);
      })
    },[session]);
    if (loading) {
      return null;
    }
    const handleLogout = async ()=>{
      if(!isConnected){
        setErr('you should connect to internet !');
        return;
      }
      const {error} = await supabase.auth.signOut();
      if (error) {
        Alert.alert("logout error: ", error);
      };
    };
    const handleDate = (date)=>{
      const fixedDate = date.split('T')[0];
      let day = fixedDate.split('-')[2];
      let intmonth = fixedDate.split('-')[1];
      let year = fixedDate.split('-')[0];
      let month;
      // if (day[0] == '0') day = day[1];
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
    }
  if(!session){
  return (
    <>
    <View style={[styles.container]}>
    <View style={{backgroundColor:colors.primary, width:500,height:500, position:'absolute',top:-350,borderRadius:150}}>
    </View>
      <Text style={[styles.title, {color: darkMode?'white':colors.secondry}]}>Profile</Text>
      <View style={{}}>
      <Ionicons name='person' color={'grey'} size={80}/>
      </View>

      <View style={[{marginVertical: 20, backgroundColor:'', gap:12}]}>
        <Pressable style={[styles.btn]} onPress={()=>{router.push("/login")}}>
            <Text style={{color:darkMode?'black':'white',fontSize:16, fontFamily: fonts.main, fontWeight:'bold'}}>Login</Text>
        </Pressable>
        <Pressable style={[styles.btn]} onPress={()=>{router.push('/signup')}}>
            <Text style={{color:darkMode?'black':'white',fontSize:16, fontFamily: fonts.main, fontWeight:'bold'}}>Create Account</Text>
        </Pressable>
      </View>
      <Text style={{fontFamily:fonts.main,textAlign:'center',width:300,marginTop:20, color:darkMode?'grey':'gray', fontSize:12, fontWeight:'thin',padding:12,paddingBottom:50}}>you'd better have an account to save your notes permanently.</Text>
    </View>
    </>
  )
  }
  return (
    <>
    <View style={[styles.container]}>
    <View style={{backgroundColor:colors.primary, width:500,height:500, position:'absolute',top:-350,borderRadius:150}}>
    </View>
      <Text style={[styles.title, {color: darkMode?'white':colors.secondry}]}>Profile</Text>
      <View style={{}}>
      <Ionicons name='person' color={'grey'} size={80}/>
      </View>
    <View style={[styles.profiledata,{ padding: 20 }]}>
      <Text style={[styles.text,{color:'grey'}]}>Welcome, {profile?.full_name ?? session.user.email}</Text>
      <Text style={[styles.text,{fontSize:20,color:darkMode?'white':'black'}]}>@{profile?.username}</Text>
      <View style={{flexDirection:'row', gap:8}}>
        <Pressable style={{backgroundColor:colors.primary, padding:5,borderRadius:6, marginTop:22}} onPress={handleLogout}>
          <Text style={[styles.text,{color:colors.secondry}]}>Logout</Text>
        </Pressable>
        <Pressable style={{backgroundColor:colors.primary, padding:5,borderRadius:6, marginTop:22}} onPress={()=>{router.push('/updateinfo')}}>
          <Text style={[styles.text,{color:colors.secondry}]}>Update Info</Text>
        </Pressable>

      </View>
      {!!err && <Text style={[styles.text,{color:'#640000ff', backgroundColor:'#ff9696ff', marginTop:10,textAlign:'center',padding:5}]}>{err}</Text>}
      {isConnected && <Text style={[styles.text,{color:'grey', marginTop:15,textAlign:'center'}]}>you've been using Quill since {handleDate(profile?.created_at ?? session.user.email)}</Text>}
    </View>

      
    </View>
    </>
  );
};
const styles = StyleSheet.create({
    container:{
        paddingTop: 60,
        flex:1,
        // backgroundColor:'red',
        alignItems:'center',
        // justifyContent:'center',
        flexDirection:'column',
    },
    text:{
      fontFamily: fonts.main,
    },
    title:{
        fontFamily: fonts.main,
        fontSize: 40,
        color: colors.secondry,
        marginBottom: 60,
    },
    btn:{
        backgroundColor: colors.primary,
        padding:4,
        borderRadius: 3,
        alignItems:'center'
    },
    designcontainer:{
        
    },
    profiledata:{
      alignItems:'center',
      gap:4
    }
});
export default Firstcomponent