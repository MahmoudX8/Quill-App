import { View, Text } from 'react-native'
import React from 'react'
import Login from "../../screens/Login";
import Navigatorbar from "../../components/Navigatorbar";
import { SafeAreaView } from "react-native-safe-area-context";
const login = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <Login />
      {/* <Navigatorbar /> */}
    </SafeAreaView>
  )
}

export default login