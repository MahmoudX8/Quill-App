import { View, Text, SafeAreaViewBase } from 'react-native';
import React from 'react';
import Profile from "../../screens/Profile.jsx";
import Navigatorbar from "../../components/Navigatorbar.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
const profile = () => {
  return (
    <>
    <SafeAreaView style={{flex:1}}>
        <Profile/>
        <Navigatorbar />
    </SafeAreaView>
    </>
  )
}

export default profile