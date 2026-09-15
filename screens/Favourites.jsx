import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import Firstcomponent from '../components/favouritespage/Firstcomponent';
import Title from '../components/favouritespage/Title';
import { useTheme } from "../contexts/ThemeContext";

const Favourites = () => {
    const {darkMode} = useTheme();
  return (
    <>
    <View style={{flex:1, backgroundColor: darkMode? "black" : ""}}>
        <StatusBar hidden/>
        <Title />
        <Firstcomponent />
    </View>
    </>
  )
}

export default Favourites