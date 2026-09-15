import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const migrateLocalNotesToSupabase = async (session) => {
    if(!session) return;
    // only migrate once per device — avoid re-inserting on every future login
    const alreadyMigrated = await AsyncStorage.getItem('notes_migrated');
    if (alreadyMigrated) return;
    const local = await AsyncStorage.getItem('notes');
    const localNotes = local ? JSON.parse(local) : [];
    if (localNotes.length === 0) {
    await AsyncStorage.setItem('notes_migrated', 'true');
    return;
    };
    const rows = localNotes.map(n=>({
        title: n.title,
        content: n.content,
        type: n.type,
        user_id: session.user.id,
    }));
    const {error} = await supabase.from('notes').insert(rows);
    if (!error) {
    await AsyncStorage.removeItem('notes');
    await AsyncStorage.setItem('notes_migrated', 'true');
  }
};