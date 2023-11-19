import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import StatsPlayer from './StatsPlayer';

const Stack = createNativeStackNavigator();

const StatsPlayerStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="stats-player" component={StatsPlayer} options={{ title: 'Seu Historico' }} />
        </Stack.Navigator>
    )
}

export default StatsPlayerStack