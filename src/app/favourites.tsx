import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Favourites from '../../screens/Favourites'
import Navbar from '../../components/Navbar'
import Navigatorbar from '../../components/Navigatorbar'
export default function favourites() {
  return (
    <SafeAreaView style={{flex: 1}}>
        {/* <Navbar /> */}
        <Favourites />
        <Navigatorbar />
    </SafeAreaView>
  )
}