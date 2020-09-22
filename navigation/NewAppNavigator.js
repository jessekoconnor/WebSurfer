import * as React from 'react';
// import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Screens
import Active from '../src/dashboards/Active';
import Nightlife from '../src/dashboards/NightLife';
import SettingsScreen from '../screens/SettingsScreen';
import Retro from '../src/dashboards/LifestyleRetro';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Active" component={Active} />
        <Tab.Screen name="Nightlife" component={Nightlife} />
        <Tab.Screen name="Retro" component={Retro} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}