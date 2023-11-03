import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Telas
import CaixasStack from './telas/telasBottomNav/caixas/CaixasStack';
import Inventario from './telas/telasBottomNav/inventario/Inventario';
import StatsPlayer from './telas/telasBottomNav/statsPlayer/StatsPlayer';

const Tab = createMaterialBottomTabNavigator();

export default function App() {

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
              component={Inventario}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="apps-box" size={26} />
                )
              }}
            />
            <Tab.Screen
              name="Conta"
              component={StatsPlayer}
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
  );
}