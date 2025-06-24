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

      {/* Home page */}
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />

      {/* Add Expense page */}
      <Stack.Screen 
        name="addexpense"
        options={{ 
          title: "Add Expense",
          presentation: "modal",
          headerShown: false,
        }} 
      />

      {/* Expense History page */}
      <Stack.Screen 
        name="ExpenseHistory"
        options={{ 
          title: "Expense History",
          headerShown: false,
        }}
      />

      {/* Profile Screen */}
      <Stack.Screen
        name="ProfileScreen"
        options={{
          title: "Profile",
          headerShown: false, // you can change to false if you want no header
        }}
      />
    </Stack>
  );
}
