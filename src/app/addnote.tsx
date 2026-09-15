import { View, Text, SafeAreaViewBase } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import Navbar from '../../components/Navbar'
import Navigatorbar from '../../components/Navigatorbar'
import AddNote from '../../screens/AddNote'

const addnote = () => {
  return (
    <>
    <SafeAreaView style={{flex:1}}>
      {/* <Navbar /> */}
      <AddNote />
      <Navigatorbar />
    </SafeAreaView>
    </>
  )
}

export default addnote