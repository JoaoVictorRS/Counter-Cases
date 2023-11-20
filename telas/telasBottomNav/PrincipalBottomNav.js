import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Image } from 'react-native';
import SteamAPI from '../../services/SteamAPI';

//Telas
import CaixasStack from './caixas/CaixasStack';
import StatsPlayerStack from './statsPlayer/StatsPlayerStack';
import NoticiasStack from './noticias/NoticiasStack';

const Tab = createMaterialBottomTabNavigator();

const principalBottomNav = () => {

  const [accountIcon, setAccountIcon] = useState([]);
  const [accountName, setAccountName] = useState('');

  useEffect(() => {

    AsyncStorage.getItem('usuario').then(usuario => {

      SteamAPI.get(`/GetPlayerSummaries?idUser=` + usuario).then(resultado => {
        const resposta = resultado.data.response.players
        setAccountIcon(resposta[0].avatar)
        setAccountName(resposta[0].personaname)
      })

    })

  }, []);

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
              name={accountName || ' '}
              component={StatsPlayerStack}
              options={{
                tabBarIcon: () => (
                  accountIcon ? <Image
                    source={{ uri: accountIcon }}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      borderWidth: 2,
                      borderColor: 'black',
                    }}
                  /> : <MaterialCommunityIcons name="chart-arc" size={26} />
                )
              }}
            />
             <Tab.Screen
              name="Noticias"
              component={NoticiasStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="newspaper-variant-outline" size={26} />
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