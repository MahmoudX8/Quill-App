import { Text, View, Modal ,StyleSheet, ScrollView, StatusBar, ImageBackground, Image, Button, ActivityIndicator} from "react-native";
import React, { useState } from 'react'

export default function Footer() {
  return (
      <View style={{backgroundColor:"darkgrey" ,padding:20, display:"flex",flexDirection:"row", justifyContent:"space-between"}}>
        <View>
        <Text>Footer</Text>
        </View>
      </View>
  )
}