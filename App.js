import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
// import { PaperProvider } from 'react-native-paper';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Telas
//Import da solução temporaria caso precise so descomentar
// import CaixasStack from './telas/telasBottomNav/caixas/CaixasStack';
// import InventarioStack from './telas/telasBottomNav/inventario/InventarioStack';
// import StatsPlayerStack from './telas/telasBottomNav/statsPlayer/StatsPlayerStack';
import Login from './telas/Login';
import principalBottomNav from './telas/telasBottomNav/PrincipalBottomNav';
import { NavigationContainer } from '@react-navigation/native';

//Import da solução temporaria caso precise so descomentar
//const Tab = createMaterialBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false, // Esconde o cabeçalho em todas as telas
        }}>
          <Stack.Screen name="login" component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name="principal-bottom-nav" component={principalBottomNav} options={{ title: 'Counter-Stats' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}