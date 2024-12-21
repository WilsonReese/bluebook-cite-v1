import React, { useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import globalStyle from "../utils/styles";
import { Figtree_600SemiBold } from "@expo-google-fonts/figtree";

export function Message({ message, color, duration = 1000, onHide, location = 40 }) {
  const opacity = new Animated.Value(1);

  useEffect(() => {
    const fadeOut = Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    });

    const timer = setTimeout(() => {
      fadeOut.start(() => {
        onHide();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onHide]);

  return (
    <Animated.View style={[
      s.messageContainer,
      { opacity, backgroundColor: color, top: location }
    ]}>
      <Text style={[globalStyle.text, s.messageText]}>{message}</Text>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  messageContainer: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
    paddingVertical: 4,
    paddingHorizontal: 40,
    borderRadius: 100,
    zIndex: 1,
  },
  messageText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: 'Figtree_600SemiBold',
  },
});
