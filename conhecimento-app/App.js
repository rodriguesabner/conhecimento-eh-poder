import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import Routes from './src/routes';
import { useEffect } from 'react';

export default function App() {
  const firebaseConfig = {
    databaseURL: 'https://conhecimento-eh-poder-default-rtdb.firebaseio.com',
    projectId: 'conhecimento-eh-poder',
  };

  initializeApp(firebaseConkfig); 

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Routes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
