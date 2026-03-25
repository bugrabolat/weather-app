// app/_layout.tsx
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import 'react-native-reanimated';
import Toast from "react-native-toast-message";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    // 2 saniye splash göster, sonra normal app aç
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={[styles.splashContainer, { width, height }]}>
        <Image
          source={require('@/assets/images/splash-2.png')}
          style={[styles.splashImage, { width, height }]}
        />
      </View>
    );
  }

  // Splash bitti, normal layout render
  return (
    <View style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <Toast />
        <StatusBar style="light" />
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    resizeMode: 'cover',
  },
});