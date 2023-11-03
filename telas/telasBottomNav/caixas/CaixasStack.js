import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Caixas from './Caixas';
import ItensCaixa from './ItensCaixa';
import Login from '../../Login';

const Stack = createNativeStackNavigator();

const CaixasStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="caixas" component={Caixas} options={{ title: 'Caixas' }} />
            <Stack.Screen name="itens-caixa" component={ItensCaixa} options={{ title: 'Itens' }} />
        </Stack.Navigator>
    )
}

export default CaixasStack