import { View, Text } from 'react-native'
import React from 'react'
import ForgetPass from "../../screens/ForgetPass";
import { SafeAreaView } from "react-native-safe-area-context";
const forgetpassword = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <ForgetPass />
    </SafeAreaView>
  )
}

export default forgetpassword