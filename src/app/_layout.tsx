import { Stack } from "expo-router";
import { ThemeContextProvider } from "../../contexts/ThemeContext";
import { AuthContextProvider } from "../../contexts/AuthContext";
import { NetworkProvider } from "../../contexts/NetworkContext";

export default function RootLayout() {
  return (
    <NetworkProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="index" />
          </Stack>
        </ThemeContextProvider>
      </AuthContextProvider>
    </NetworkProvider>
  );
}