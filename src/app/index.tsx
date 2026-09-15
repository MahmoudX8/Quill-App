import { useEffect, useState } from "react";
import { NavigationContainer } from "expo-router/build/react-navigation";
import { Text, View, Modal ,StyleSheet, ScrollView, StatusBar, ImageBackground, Image, Button, ActivityIndicator, SafeAreaViewBase} from "react-native";
import {Home} from '../../screens/Home';
import Notes from "../../screens/Notes";
import NavBar  from "../../components/Navbar.jsx";
import Navigatorbar  from "../../components/Navigatorbar.jsx";
import { createNativeStackNavigator } from "expo-router/build/react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:1}}>
        <NavBar />
          <Home />
        <Navigatorbar/>
      </View>
    </SafeAreaView>
    </>
  );
};