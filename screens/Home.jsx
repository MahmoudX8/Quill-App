import React from 'react'
import { useEffect, useState } from "react";
import { Text, View, Modal ,StyleSheet, ScrollView, StatusBar, ImageBackground, Image, Button, ActivityIndicator} from "react-native";
import colors from '@/assets/colors/colors.js';
import Firstcomponent from '../components/homepage/Firstcomponent.jsx';
import Secondcomponent from '../components/homepage/Secondcomponent.jsx';
import Thirdcomponent from '../components/homepage/Thirdcomponent.jsx';
import Fourthcomponent from '../components/homepage/Fourthcomponent.jsx';
import Footer  from '../components/homepage/Footer.jsx';
import NavBar  from '../components/Navbar.jsx';
import { useTheme } from "../contexts/ThemeContext.jsx";
export const Home = () => {
    const [showModal,setShowModal]= useState(false);
    const [loading,setLoading]= useState(false);
    const {darkMode} = useTheme();
    // useEffect(()=>{
    //     setTimeout(() => {
    //     setShowModal(true);
    //     }, 2000);
    // },[]);
  return (
    <>
    <ScrollView style={{flex:1, backgroundColor:darkMode?'black':''}}>
    <StatusBar hidden/>
    <Firstcomponent />
      <Secondcomponent />
      <Thirdcomponent />
      <Fourthcomponent />
      {/* <ActivityIndicator size={"large"} animating={loading}/>
      <Modal visible={showModal} animationType="slide" transparent={true}>
          <View style={{width:"60%", height:300, padding:50, borderRadius:10, backgroundColor:"white", boxShadow:"3px 3px 7px black", alignSelf:"center", justifyContent:"space-between", top:150}}>
            <View>
              <Text style={{textAlign:"center",fontWeight:"bold", top:0, fontSize:34}}>Save Your Notes!
              </Text>
              <Text style={{textAlign:"center", color:"gray"}}>You better create an account to save your notes permenantly</Text>
            </View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-around",width:"100%",alignSelf:"center"}}>
              <Button title="Register" color={colors.primary}  onPress={()=>{setLoading(!loading)}} ></Button>
              <Button title="later" color={"grey"} onPress={()=>setShowModal(false)} ></Button>
            </View>
          </View>
      </Modal> */}
      {/* <View style={[styles.container,{justifyContent: "center"}]}>
        <ImageBackground source={require("@/assets/images/react-logo.png")} style={{width:"100%", height:500, display:"flex", justifyContent:"center"}}>
          <Text style={{fontSize:33, textAlign:"center", opacity:1}}>subtitle</Text>
        </ImageBackground>
      </View>
      <View style={{width:500, height:500}}>
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque id odio earum eum provident laborum totam nisi placeat rem explicabo, architecto nemo harum assumenda a sunt! Facilis placeat quasi voluptates fugit eveniet, repudiandae quod. Facere quos similique eligendi, animi vero quidem aliquid cum quas hic quam aspernatur, ipsa deleniti magnam distinctio blanditiis, excepturi nesciunt. Incidunt ad voluptatibus architecto quae! Perferendis recusandae dolorum magnam hic? Architecto quisquam quia consectetur aliquam minus sit ipsum, perspiciatis sequi suscipit, velit fuga recusandae praesentium officiis commodi illo nobis vitae eveniet quibusdam ipsa quaerat possimus libero doloremque hic voluptatem. Vero amet eos, voluptate enim voluptatibus omnis earum, doloremque, labore totam unde non aut eius nostrum illum quod obcaecati eligendi sed dolores mollitia porro quas soluta facilis. Iusto minus officia quidem, reiciendis ipsum consequuntur earum hic quisquam? Earum delectus architecto, ipsum qui assumenda vitae autem rerum corporis doloremque temporibus aut! Voluptates provident a mollitia animi ducimus perferendis esse sit voluptatibus modi, iure placeat dolor veniam hic ad aliquid labore non facere quis. Similique aut nemo quo libero esse accusantium fugiat quasi perferendis distinctio! Laborum praesentium aspernatur iure error labore blanditiis eaque quam debitis odit facilis consectetur nobis perferendis illum itaque nemo, voluptates iste placeat at eius nam?</Text>
      </View> */}
      {/* <Footer /> */}
    </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: 500,
    display:"flex",
    flexDirection: 'row',
  },
});