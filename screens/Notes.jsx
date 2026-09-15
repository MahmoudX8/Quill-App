import { View, Text, ScrollView, StatusBar } from 'react-native';
import React from 'react';
import Firstcomponent from '../components/notespage/Firstcomponent.jsx';
import { useTheme } from "../contexts/ThemeContext.jsx";
const Notes = ()=>{
  const {darkMode} = useTheme();
  return (
    <>
      <View style={{ flex:1 ,backgroundColor: darkMode ? "black" : ''}}>
        <StatusBar hidden/>
        <Firstcomponent/>
      </View>
    </>
  )
};
export default Notes;