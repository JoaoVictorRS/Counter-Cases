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
        <Stack.Navigator>
          <Stack.Screen name="login" component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name="principal-bottom-nav" component={principalBottomNav} options={{ title: 'Counter-Stats' }} />
        </Stack.Navigator>
      </NavigationContainer>
      {/*
      
      +++++++++++++++SOLUÇÃO TEMPORARIA+++++++++++++++
      
      <PaperProvider>
        <NavigationContainer independent={true}>
          <Tab.Navigator>
            <Tab.Screen
              name="Caixas"
              component={CaixasStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="archive" size={26} />
                )
              }}
            />
            <Tab.Screen
              name="Inventario"
              component={InventarioStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="apps-box" size={26} />
                )
              }}
            />
            <Tab.Screen
              name="Conta"
              component={StatsPlayerStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="chart-arc" size={26} />
                )
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
     */}
    </>
  );
}