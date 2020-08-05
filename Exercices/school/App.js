import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SchoolProvider } from './store/SchoolProvider'

import HomeScreen from './screens/HomeScreen'
import StudentScreen from './screens/StudentScreen'
import LessonScreen from './screens/LessonScreen'
import AbsenceScreen from './screens/AbsenceScreen';

// On utilise la classe createStackNavigator de React navigation
const Stack = createStackNavigator();

// Définition de la navigation pour votre application 
// Notez que initialRouteName définit la page par défaut 
// quand l'application se charge

// Vous devez définir un wraper NavigationContainer puis 
// utilisez les composants Stack.Navigator et Stack.Screen
// pour définir les éléments de navigation
const Nav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Students" component={StudentScreen} />
        <Stack.Screen name="Lessons" component={LessonScreen} />
        <Stack.Screen name="Absences" component={AbsenceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const App = () => (
  <SchoolProvider>
    <Nav />
  </SchoolProvider>
);

export default App;