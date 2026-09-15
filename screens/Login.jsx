import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import Loginpage from "../components/authpage/Loginpage";
import { useTheme } from '../contexts/ThemeContext';

const Login = () => {
  const {darkMode} = useTheme()
  return (
    <ScrollView style={{flex:1, backgroundColor:darkMode?'black':''}}>
        <StatusBar hidden/>
        <Loginpage />
    </ScrollView>
  )
}

export default Login