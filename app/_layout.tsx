import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "nb": require('../assets/fonts/Nunito-Bold.ttf'),
    "nm": require('../assets/fonts/Nunito-Medium.ttf'),
    "nr": require('../assets/fonts/Nunito-Regular.ttf'),
    "pb": require('../assets/fonts/Parkinsans-Bold.ttf'),
    "pm": require('../assets/fonts/Parkinsans-Medium.ttf'),
    "pr": require('../assets/fonts/Parkinsans-Regular.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <>
      <StatusBar style='light'/>
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Colors.white
          },
          headerStyle: {
            backgroundColor: Colors.background
          }
        }}
      >
        <Stack.Screen name="index" options={{
          title: "भागवद गीता - अध्याय",
          headerTitleStyle: {
            fontFamily: 'nb',
            color: Colors.orange,
            fontSize: 24
          }
        }}/>
        <Stack.Screen name="chapter/[chapterId]" options={{
          headerTitleStyle: {
            fontFamily: 'nb',
            color: Colors.orange,
            fontSize: 24
          }
        }}/>
      </Stack>
    </>
  );
}
