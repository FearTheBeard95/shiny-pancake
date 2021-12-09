import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddEntry from './components/AddEntry';
import store from './store';
import History from './components/History';
import EntryDetail from './components/EntryDetail';
import { gray, purple } from './utils/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator initialRouteName='History'>
    <Tab.Screen
      name='History'
      component={History}
      options={{
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name='calendar' size={25} color={gray} focused={true} />
        ),
      }}
    />
    <Tab.Screen
      name='Add Entry'
      component={AddEntry}
      options={{
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name='add' size={25} color={gray} focused={true} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <View style={{ height: 20 }} />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='Home'
              component={HomeTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen name='EntryDetail' component={EntryDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
