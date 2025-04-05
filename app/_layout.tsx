import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          // headerShown: false // Hides the header for the index screen
          title: 'Crypto.com'
        }} 
      />
    </Stack>
  );
}
