// app/(tabs)/_layout.tsx
import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack>
      {/* SplashScreen is the first screen */}
      <Stack.Screen 
        name="SplashScreen" 
        options={{ headerShown: false }} 
      />
      {/* Home page, after splash */}
      <Stack.Screen 
        name="index" 
        options={{  headerShown: false }} 
      />
      {/* Add other screens here */}
    </Stack>
  );
}
