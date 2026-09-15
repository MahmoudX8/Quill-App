import Notes from "../../screens/Notes";
import NavBar  from "../../components/Navbar.jsx";
import Navigatorbar from "../../components/Navigatorbar.jsx";
import { Text, View, Modal ,StyleSheet, ScrollView, StatusBar, ImageBackground, Image, Button, ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function NotesRoute() {
  return(
    <>
    <SafeAreaView style={{flex:1}}>
      <View style={{ flex: 1 }}>
        {/* <NavBar /> */}
        <Notes />
        <Navigatorbar/>
      </View>
    </SafeAreaView>
    </>
)};