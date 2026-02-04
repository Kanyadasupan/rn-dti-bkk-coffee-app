import { Stack } from "expo-router";
import {
  Prompt_400Regular,
  Prompt_700Bold,
  useFonts,
} from "@expo-google-fonts/prompt";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Prompt_400Regular,
    Prompt_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          title: "Top 10 Bangkok Coffee",
          headerBackButtonDisplayMode: "minimal",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "Prompt_400Regular",color: "#fff" },
          headerStyle: { backgroundColor: "#2c1c05" },
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "รายละเอียดร้าน",
          headerBackButtonDisplayMode: "minimal",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#302008" },
        }}
      />
    </Stack>
  );
}
