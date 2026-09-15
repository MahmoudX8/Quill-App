import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from "expo-router";
import NoteScreen from "../../../screens/Note.jsx";

const Note = () => {
    const {id} = useLocalSearchParams<{ id: string }>();
    return <NoteScreen id={id}/>;
}

export default Note