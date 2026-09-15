import { View, Text, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import Forgetpasspage from "../components/authpage/Forgetpasspage";
import { useTheme } from "../contexts/ThemeContext";
const ForgetPass = () => {
  const {darkMode} = useTheme()
  return (
    <ScrollView style={{flex:1, backgroundColor:darkMode?'black':'white'}}>
        <StatusBar hidden/>
        <Forgetpasspage />
    </ScrollView>
  )
}

export default ForgetPass