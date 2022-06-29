import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect} from 'react';
import {  setupDb, getTableInfo  } from './database/DbUtils'
import MainTodosScreen from './screens/MainTodosScreen';
import SelectedTodoScreen from './screens/SelectedTodoScreen';
import {View, Text} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import FetchedTodosScreen from './screens/FetchedTodosScreen';

export default function App() {

  useEffect(() => {
    setupDb()
      .then(result => {
        console.log("result from setting up database", result)
        return getTableInfo()
      })
      .then(res => console.log("pragma table_info", res))
      .catch(err => console.log(err))
  }, [])


  
  const NativeStack = createNativeStackNavigator()

  // Skapar en tab i nedre delen av applikationen
  const BottomTab = createBottomTabNavigator();


  const MyTodosScreen = () => {


    return (
    // NativeStack.Navigator håller både screens
    // NativeStack.screen används för att skicka vidare användaren fram & tillbaka mellan SelectedTodoScreen & MainTodosScreen
      <NativeStack.Navigator>
        <NativeStack.Screen
          options={{ headerShown: false }}
          name='Todos'
          component={MainTodosScreen}
        />
        <NativeStack.Screen
          name='Modify Todo'
          component={SelectedTodoScreen}
        />
      </NativeStack.Navigator>
    );
  }

 

  return (
    // NavigationContainer håller BottomTab.navigator componenten
    // BottomTab.Navigator visar antingen MyTodos och FetchedTodosScreen 
    <NavigationContainer>
      <BottomTab.Navigator screenOptions={{ headerShown: false }}>
        <BottomTab.Screen
          name='MyTodos'
          component={MyTodosScreen}
          options={{
            tabBarIcon: () => <FontAwesome name="tasks" size={24} color="black" />
          }}
        />
        <BottomTab.Screen
          name='Out Source Data'
          component={FetchedTodosScreen}
          options={{
            tabBarIcon: () => <FontAwesome name="wifi" size={24} color="black" />
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>

  );
}



