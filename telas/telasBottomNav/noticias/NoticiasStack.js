import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Noticias from './Noticias';

const Stack = createNativeStackNavigator();

const NoticiasStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="noticias" component={Noticias} options={{ title: 'Ultimas Noticias' }} />
        </Stack.Navigator>
    )
}

export default NoticiasStack