import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import fonts from "@/assets/fonts/fonts";
import colors from "@/assets/colors/colors";
import { useTheme } from "../../contexts/ThemeContext";
import { getNote, getNotes } from "../../storage/storage.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { supabase } from "../../lib/supabase.js";
import { calculateStreak } from "../../utils/streak.js";

const Fourthcomponent = () => {
  const { darkMode } = useTheme();
  const [numNotesPerW, setNotesPerW] = useState("");
  const {session,loading: authloading} =useAuth();
  const [streakDays, setStreakDays] = useState(0)
  const now = Date.now();
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  useEffect(() => {
    if(authloading) return;
    const fetchNotesFromAsyncStorage = async () => {
      try {
        const notes = await getNotes();
        let fetched = notes;
        const dates = notes.map((item) => item.created_at);
        setStreakDays(calculateStreak(dates));
        fetched = fetched.map((item) => item.created_at);
        fetched = fetched.filter((time) =>
          ((now - new Date(time).getTime()) / (3600000 * 24 * 7)) <= 1
            ? time
            : ""
        );
        setNotesPerW(fetched.length);
      } catch (e) {
        console.log(e)
        setNotesPerW(0);
        setStreakDays(0);
      }
    };
    const fetchNotesFromDB = async () =>{
      try {
        const { count, error: countError } = await supabase.from('notes').select('*', { count: 'exact', head: true }).eq('user_id', session.user.id).gte('created_at', oneWeekAgo);
        const { data, error: datesError } = await supabase.from('notes').select('created_at').eq('user_id', session.user.id);
        if (countError) {
          console.log(countError);
          return;
        }
        setNotesPerW(count);
        if (datesError) {
        console.log(datesError);
        return;
        } 
        setStreakDays(calculateStreak(data.map((n) => n.created_at)));
      } catch (error) {
        console.log(e);
        setNotesPerW(0);
        setStreakDays(0);
      }
    };
    if (session) {
      fetchNotesFromDB();
    } else {
      fetchNotesFromAsyncStorage();
    }
  }, [session, authloading]);
  return (
    <>
      <View
        style={[styles.container, { backgroundColor: darkMode ? "black" : "" }]}
      >
        <View style={[styles.statscontainer]}>
          <Text
            style={[
              styles.text,
              { color: darkMode ? "white" : colors.secondry },
            ]}
          >
            {streakDays}-day streak
          </Text>
          <Ionicons name="flame" color={"orange"} size={30} />
        </View>
        <View style={[styles.statscontainer]}>
          <Text
            style={[
              styles.text,
              { color: darkMode ? "white" : colors.secondry },
            ]}
          >
            {numNotesPerW > 0
              ? `${numNotesPerW} notes this week`
              : `Didn't make notes this week`}
          </Text>
          <Ionicons name="document" color={"orange"} size={30} />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    height: 300,
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom:100
  },
  text: {
    fontFamily: fonts.main,
    fontSize: 22,
    color: colors.secondry,
  },
  statscontainer: {
    alignItems: "center",
    gap: 15,
    flexDirection: "row",
  },
});
export default Fourthcomponent;
