import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import MovieDetail from './components/MovieDetail';
import SeriesDetail from './components/SeriesDetail';
import UserDashboard from './components/UserDashboard';
import LoginUser from './components/LoginUser';



// Redux, Thunk
// axios
// UseMemo
// UseCalback
// Componetsler

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        options={{
          backgroundColor: '#000',
          headerShown: false,
        }}
        initialRouteName="Homee" headerMode="none">
        <Stack.Screen

          options={{
            backgroundColor: '#000',
            headerShown: false,
          }}
          name="Home">
          {() => (
            <Tab.Navigator initialRouteName="Home">
              <Tab.Screen
                options={{
                  backgroundColor: '#000',
                  headerShown: false,
                  tabBarLabel: '',
                  tabBarIcon: ({ color, size }) => (
                    <AntDesign name="home" size={24} color="black" />
                  ),
                }}
                name="Homee" component={Home} />


              <Tab.Screen
                options={{
                  backgroundColor: '#000',
                  headerShown: false,
                  tabBarLabel: '',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="favorite-border" size={24} color="black" />
                  ),
                }}
                name="Favori" component={LoginUser} />

              <Tab.Screen
                options={{
                  backgroundColor: '#000',
                  headerShown: false,
                  tabBarLabel: '',
                  tabBarIcon: ({ color, size }) => (
                    <AntDesign name="search1" size={24} color="black" />
                  ),
                }}
                name="Search" component={Home} initialParams={{ age: 45 }}/>

              <Tab.Screen
                
                options={{
                  tabBarShowLabel: false,
                  backgroundColor: '#000',
                  headerShown: false,
                  tabBarLabel: '',

                  tabBarVisibilityAnimationConfig: false,
                  tabBarIcon: ({ color, size }) => (
                    <AntDesign name="user" size={24} color="black" />
                  ),
                }}

                name="Login" component={Login} initialParams={{ age: 45 }} />
            </Tab.Navigator>
          )}
        </Stack.Screen>


        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="MovieDetail" component={MovieDetail} />
           <Stack.Screen
          options={{
            headerShown: false
          }}
          name="UserDashboard" component={UserDashboard} />

        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="SeriesDetail" component={SeriesDetail} />
      </Stack.Navigator>
    </NavigationContainer>
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
