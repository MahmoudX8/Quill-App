import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import Firstcomponent from "../components/profilepage/Firstcomponent";
import Themecomponent from "../components/profilepage/Themecomponent";
import Languagecomponent from "../components/profilepage/Languagecomponent";
import Versioncomponent from "../components/profilepage/Versioncomponent";
import {useTheme} from "../contexts/ThemeContext";
const Profile = () => {
    const {darkMode} = useTheme();
  return (
    <>
    {/* <Test /> */}
    <ScrollView style={{flex:1,backgroundColor:darkMode?'black':''}}>
        <StatusBar hidden/>
        <Firstcomponent />
        <Themecomponent />
        <Languagecomponent />
        <Versioncomponent />
    </ScrollView>
    </>
  )
}

export default Profile