import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from "expo";
import * as Font from "expo-font";

// IMPORT MainNavigation to navigate between screens
import MainNavigation from './navigation/MainNavigation';



// IMPORT react-native-screens to optimize performance with multiple screens
import { enableScreens } from "react-native-screens";

export default function App() {
  // Optimize Screen Performance
  enableScreens();

  // States
  const [fontLoaded, setFontLoaded] = useState(false);

  // Functions to load fonts
  const fetchFonts = () => {
    return Font.loadAsync({
      "ms-new-tai-lue": require("./assets/fonts/microsoft-new-tai-lue-regular.ttf"),
      "ms-new-tai-lue-bold": require("./assets/fonts/microsoft-new-tai-lue-bold.ttf")
    });
  }


  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => { setFontLoaded(true) }} />
  }




  return (
    <MainNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
