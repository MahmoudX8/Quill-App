import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import Signuppage  from "../components/authpage/Signuppage";
import { useTheme } from '../contexts/ThemeContext';
const CreateAcc = () => {
  const {darkMode} = useTheme()
  return (
    <ScrollView style={{flex:1, backgroundColor: darkMode? "black" : ""}}>
        <StatusBar hidden/>
        <Signuppage />
    </ScrollView>
  )
}

export default CreateAcc