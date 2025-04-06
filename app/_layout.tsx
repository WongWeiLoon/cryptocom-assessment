import { Stack } from "expo-router";
import { useEffect } from "react";

import { initDatabase } from "@src/database/DatabaseService";

export default function RootLayout() {
  // Initialize the database when the component mounts.
  useEffect(() => {
    initDatabase()
      .catch((error) => {
        console.error('Failed to initialize database:', error);
      });
  }, []);
  
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          // headerShown: false // Hides the header
          title: 'Crypto.com'
        }} 
      />
    </Stack>
  );
}
