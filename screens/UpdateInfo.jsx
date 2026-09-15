import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import Firstcomponent from "../components/updateinfopage/Firstcomponent";
import { useTheme } from "../contexts/ThemeContext";
const UpdateInfo = () => {
  const {darkMode} = useTheme(); 
  return (
    <ScrollView style={{flex:1, backgroundColor:darkMode?'black':''}}>
      <StatusBar hidden/>
      <Firstcomponent />
    </ScrollView>
  )
}

export default UpdateInfo