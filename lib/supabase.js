import 'react-native-url-polyfill/auto';
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
export const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    {
        auth:{
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: Platform.OS !== 'web' || typeof window !== 'undefined',
            detectSessionInUrl: false
        },
    }
);