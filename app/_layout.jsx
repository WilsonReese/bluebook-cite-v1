import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Figtree_300Light,
  Figtree_400Regular,
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
  Figtree_800ExtraBold,
  Figtree_900Black,
  Figtree_300Light_Italic,
  Figtree_400Regular_Italic,
  Figtree_500Medium_Italic,
  Figtree_600SemiBold_Italic,
  Figtree_700Bold_Italic,
  Figtree_800ExtraBold_Italic,
  Figtree_900Black_Italic,
} from "@expo-google-fonts/figtree";
import {
  STIXTwoText_400Regular,
  STIXTwoText_500Medium,
  STIXTwoText_600SemiBold,
  STIXTwoText_700Bold,
  STIXTwoText_400Regular_Italic,
  STIXTwoText_500Medium_Italic,
  STIXTwoText_600SemiBold_Italic,
  STIXTwoText_700Bold_Italic,
} from "@expo-google-fonts/stix-two-text";

SplashScreen.preventAutoHideAsync(); // Prevents the splash screen from hiding too early

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Figtree_300Light,
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
    Figtree_800ExtraBold,
    Figtree_900Black,
    Figtree_300Light_Italic,
    Figtree_400Regular_Italic,
    Figtree_500Medium_Italic,
    Figtree_600SemiBold_Italic,
    Figtree_700Bold_Italic,
    Figtree_800ExtraBold_Italic,
    Figtree_900Black_Italic,
    STIXTwoText_400Regular,
    STIXTwoText_500Medium,
    STIXTwoText_600SemiBold,
    STIXTwoText_700Bold,
    STIXTwoText_400Regular_Italic,
    STIXTwoText_500Medium_Italic,
    STIXTwoText_600SemiBold_Italic,
    STIXTwoText_700Bold_Italic,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hides the splash screen once fonts are ready
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Optionally, you can show a custom loading indicator while fonts are loading
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#184EAD" />
      </View>
    );
  }

  return <Stack />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
