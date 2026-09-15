import { View, Text } from 'react-native'
import React from 'react'
import CreateAccount from "../../screens/CreateAcc";
import Navigatorbar  from "../../components/Navigatorbar.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
const signup = () => {
  return (
    <SafeAreaView style={{flex:1}}>
        <CreateAccount />
        {/* <Navigatorbar /> */}
    </SafeAreaView>
  )
}

export default signup