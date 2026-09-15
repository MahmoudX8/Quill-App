import AsyncStorage from '@react-native-async-storage/async-storage';
const NOTES_KEY_NAME = 'notes';
const FAVORITE_KEY_NAME = 'favourite';
export const getNotes = async () =>{
    try {
        const json = await AsyncStorage.getItem(NOTES_KEY_NAME);
        return json ? JSON.parse(json) : [];
    } catch (err) {
        console.log(err);
        return [];
    }
};
export const saveNotes = async (notes)=>{
    try {
        await AsyncStorage.setItem(NOTES_KEY_NAME, JSON.stringify(notes));
    } catch (err) {
        console.log(err);
    }
};
export const getNote = async (id) =>{
    try {
        const json = await AsyncStorage.getItem(NOTES_KEY_NAME);
        const allNotes = json ? JSON.parse(json) : [];
        const note = allNotes.find(n => n.id == id);
        return note ? note : {};
    } catch (error) {
        console.log(error);
        return {};
    }
};
export const addNote = async (note)=>{
    try {
        const notes = await getNotes();
        const newNote = {id: Date.now().toString(), ...note};
        const updated = [...notes, newNote];
        await saveNotes(updated);
        return updated;
    } catch (err) {
        console.log(err);
    }
};
export const editNote = async(id,noteChanges)=>{
    try {
        const notes = await getNotes();
        const updated = notes.map(n=> n.id === id ? {...n, ...noteChanges}: n);
        await saveNotes(updated);
        return updated;
    } catch (err) {
        console.log(err);
    }
};
export const deleteNote = async(id)=>{
    try {
        const notes = await getNotes();
        const fixedNotes = [...notes].filter((note)=> note.id != id);
        await saveNotes(fixedNotes);
        return fixedNotes;
    } catch (err) {
        console.log(err);
    }
};
export const getFavoriteNotes = async()=>{
    try {
        const favIds = await getFavoriteNotesIds();
        const notes = await getNotes();
        return notes.filter(n => favIds.includes(n.id));
    } catch (err) {
        console.log(err);
        return [];
    }
};
export const getFavoriteNotesIds = async()=>{
    try {
        const json = await AsyncStorage.getItem(FAVORITE_KEY_NAME);
        return json? JSON.parse(json) : [];
    } catch (err) {
        console.log(err);
        return [];
    }
};
export const saveFavNotes = async (ids)=>{
    try {
        await AsyncStorage.setItem(FAVORITE_KEY_NAME, JSON.stringify(ids));
    } catch (err) {
        console.log(err);
    }
};
export const addToFav = async (id)=>{
    try {
        const favIds = await getFavoriteNotesIds();
        if(favIds.includes(id)) return favIds; // already exist
        const updated = [...favIds, id];
        await saveFavNotes(updated);
        return updated;
    } catch (err) {
        console.log(err);
    }
};
export const removeFromFav = async (id)=>{
    try {
        const favIds = await getFavoriteNotesIds();
        if(!(favIds.includes(id))) return favIds; // already doesn't exist
        const updated = favIds.filter(i => i != id);
        await saveFavNotes(updated);
        return updated;
    } catch (err) {
        console.log(err);
    }
};