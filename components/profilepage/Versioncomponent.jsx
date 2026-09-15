import { View, Text, StyleSheet,Pressable,Linking } from 'react-native'
import React from 'react'
import { useTheme } from "../../contexts/ThemeContext";
import colors from '@/assets/colors/colors';
import fonts from '@/assets/fonts/fonts';
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { version } from "../../package.json";
const Versioncomponent = () => {
    const { darkMode } = useTheme();
    const openLink = (url) => {
        Linking.openURL(url).catch((err) => console.log('Failed to open link:', err));
    };
  return (
    <View style={[styles.container,{}]}>
        <Text style={[styles.title, styles.text,{fontSize:25, color:darkMode?'white':'black'}]}>App Info</Text>
        <View style={[styles.compcontainer,{backgroundColor:darkMode?'#282828ff':colors.input}]}>
            <View style={{borderBottomColor:'#a5a5a5ff',paddingBottom:12, borderBottomWidth:2, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View>
                    <Text style={[styles.text, {color: darkMode?"white":"black"}]}>Version</Text>
                </View>
                <Text style={{color: darkMode?"white":"black"}}>{version}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View>
                    <Text style={[styles.text, {color: darkMode?"white":"black"}]}>Developer</Text>
                    <Text style={{color: darkMode?"#aaa":"#555", fontSize:12}}>Mahmoud Alaa</Text>
                </View>
                <View style={{flexDirection:'row', gap:16}}>
                    <Pressable onPress={() => openLink('https://github.com/MahmoudX8')}>
                        <FontAwesome name="github" size={22} color={darkMode?"white":"black"} />
                    </Pressable>
                    <Pressable onPress={() => openLink('https://linkedin.com/in/mahmoud-alaa-1324b31bb/')}>
                        <FontAwesome name="linkedin-square" size={22} color={darkMode?"white":"black"} />
                    </Pressable>
                </View>
            </View>
        </View>
        
    </View>
  )
}
const styles = StyleSheet.create({
        container:{
        height: 350,
        padding:15,
    },
    title:{
        paddingVertical:10,
        marginBottom:8,
    },
    text:{
        fontFamily: fonts.main
    },
    compcontainer:{
        backgroundColor:'red',
        padding:12,
        margin:4,
        borderRadius: 8,
        height:120,
        justifyContent:'space-around',
        // flexDirection:'row',
    },
});
export default Versioncomponent