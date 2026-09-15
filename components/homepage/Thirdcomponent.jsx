import { View, Text, StyleSheet } from "react-native";
import React from "react";
import fonts from "@/assets/fonts/fonts";
import colors from "@/assets/colors/colors";
import { useTheme } from "../../contexts/ThemeContext";

const Thirdcomponent = () => {
  const {darkMode} = useTheme();
  const cardLayers = [
    { bg: colors.primary, z: 4, rotate: "0deg", translate: [0, 0] },
    { bg: colors.barsdarkshadow, z: 3, rotate: "8deg", translate: [10, 10] },
    { bg: '#c89151ff', z: 2, rotate: "8deg", translate: [20, 20] },
    { bg: '#a7763eff', z: 1, rotate: "8deg", translate: [30, 30] },
  ];
  return (
    <>
      <View style={[styles.container, {backgroundColor: darkMode ? "black" : ""}]}>
        <View style={styles.subtitlecontainer}>
          <Text style={[styles.subtitle, {color: darkMode ? "white" : colors.secondry}]}>
            You can sort your notes into tags.
            <Text style={{ color: "#a7763eff" }}>
              {" "}
              Thoughts, Memories, Plans & Others.
            </Text>
          </Text>
        </View>
        <View style={styles.designcontainer}>
          {cardLayers.map((element, i) => (
            <View
              key={i}
              style={[
                styles.design,
                {
                  backgroundColor: element.bg,
                  zIndex: element.z,
                  transform: [
                    { translateX: element.translate[0] },
                    { translateY: element.translate[1] },
                    { rotate: element.rotate },
                  ],
                },
              ]}
            ></View>
          ))}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
  subtitlecontainer: {
    width: 142,
    height:360,
    // backgroundColor: colors.lightshadow,
    padding: 10,
    borderColor: colors.primary,
    borderStartWidth: 12,
    // borderTopWidth: 12,
    justifyContent:'center',
  },
  subtitle: {
    fontFamily: fonts.main,
    color: colors.secondry,
    fontSize: 22,
  },
  designcontainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    // backgroundColor: colors.dark,
    width: 300,
    height: 400,
    position: "relative",
  },
  design: {
    height: 180,
    width: 150,
    backgroundColor: colors.primary,
    position: "absolute",
    left: 50,
    borderRadius: 4,
    // borderWidth: 2,
    // borderColor: colors.secondry,
  },
});
export default Thirdcomponent;
