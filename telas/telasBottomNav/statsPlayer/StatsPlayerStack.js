import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import StatsPlayer from './StatsPlayer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SteamAPI from '../../../services/SteamAPI';
import StatsKills from './StatsKills';

const Stack = createNativeStackNavigator();

const StatsPlayerStack = () => {

    const [accountName, setAccountName] = useState('');

    useEffect(() => {

        AsyncStorage.getItem('usuario').then(usuario => {

            SteamAPI.get(`/GetPlayerSummaries?idUser=` + usuario).then(resultado => {
                const resposta = resultado.data.response.players
                setAccountName(resposta[0].personaname)
            })

        })

    }, []);

    return (
        <Stack.Navigator>
            <Stack.Screen name="stats-player" component={StatsPlayer} options={{ title: 'Histrico de ' + accountName || 'Seu Historico' }} />
            <Stack.Screen name="stats-kills" component={StatsKills} options={{title: 'Detalhamento'}}/>
        </Stack.Navigator>
    )
}

export default StatsPlayerStack