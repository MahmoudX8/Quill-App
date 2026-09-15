import { View, Text } from 'react-native'
import React from 'react'
import UpdateInfo from "../../screens/UpdateInfo";
import { SafeAreaView } from "react-native-safe-area-context";
const updateinfo = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <UpdateInfo />
    </SafeAreaView>
  )
}

export default updateinfo