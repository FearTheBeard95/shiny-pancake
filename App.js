import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddEntry from './components/AddEntry';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <AddEntry />
      </View>
    </Provider>
  );
}
