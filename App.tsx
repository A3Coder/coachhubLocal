/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Navigation from './src/navigation';
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  return (
     <View style={styles.root}>
        <Navigation/>
     </View>
  );
}

const styles = StyleSheet.create({
  root:{
    flex:1
  }
});

export default App;
