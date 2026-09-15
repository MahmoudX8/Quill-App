import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import Firstcomponent from '../components/addnotepage/firstcomponent';
import Title from '../components/addnotepage/title';
import { useTheme } from "../contexts/ThemeContext";
const AddNote = () => {
  const {darkMode} = useTheme();
  return (
    <>
    <ScrollView style={{flex:1 ,backgroundColor: darkMode ?'black': ""}}>
      <StatusBar hidden/>
      <Title />
      <Firstcomponent />
    </ScrollView>
    </>
  )
}

export default AddNote