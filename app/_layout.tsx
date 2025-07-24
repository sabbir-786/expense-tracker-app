<<<<<<< HEAD
=======

>>>>>>> 940d709 (Update Code)
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/authContext";
<<<<<<< HEAD



const StackLayout = () => {
  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="(modals)/profileModal" options={{
      presentation: 'modal'
    }} />
  </Stack>;
};


export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({

 

});
=======
import { ThemeProvider } from "@/contexts/ThemeContext";


const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(modals)/profileModal"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(modals)/walletModal"
        options={{
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="(modals)/transactionModal"
        options={{
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="(modals)/searchModal"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(modals)/settingModal"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StackLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});
>>>>>>> 940d709 (Update Code)
