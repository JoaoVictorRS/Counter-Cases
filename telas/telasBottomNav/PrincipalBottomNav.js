import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Telas
import CaixasStack from './caixas/CaixasStack';
import InventarioStack from './inventario/InventarioStack';
import StatsPlayerStack from './statsPlayer/StatsPlayerStack';

const Tab = createMaterialBottomTabNavigator();

const principalBottomNav = () => {
  return (
    <>
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
    </>
  )
}

export default principalBottomNav