import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Assuming you have Ionicons installed
import WheatListScreen from './screens/WheatInfo';
import AuthorScreen from './screens/Author';
import AddWheatScreen from './screens/AddWheat';
import ContactsScreen from './screens/Contacts';
import MapRouteComponent from './screens/Map';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for WheatList, Author, and AddWheat screens
const WheatInfo = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="WheatListScreen" component={WheatListScreen} />
  </Stack.Navigator>
);
const MapRoute = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MapRoute" component={MapRouteComponent} />
  </Stack.Navigator>
);
const WheatAdd = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AddWheatScreen" component={AddWheatScreen} />
  </Stack.Navigator>
);
const Author = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Author" component={AuthorScreen} />
  </Stack.Navigator>
);
const Contacts = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Contacts" component={ContactsScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Info') {
              iconName = 'ios-information-circle'; // Change it to the actual icon name
            } else if (route.name === 'Add') {
              iconName = 'ios-add-circle';
            } else if (route.name === 'Author') {
              iconName = 'ios-person';
            } else if (route.name === 'Contacts') {
              iconName = 'ios-phone-portrait';
            } else if (route.name === 'MapRoute') {
              iconName = 'ios-map';
            }
            

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        
        <Tab.Screen name="MapRoute" component={MapRoute} />
        <Tab.Screen name="Contacts" component={Contacts} />
        <Tab.Screen name="Info" component={WheatInfo} />
        <Tab.Screen name="Add" component={WheatAdd} />
        <Tab.Screen name="Author" component={Author} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
