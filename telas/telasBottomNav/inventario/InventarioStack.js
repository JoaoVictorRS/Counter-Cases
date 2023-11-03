import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Inventario from './Inventario';
import Login from '../../Login';

const Stack = createNativeStackNavigator();

const InventarioStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="inventario" component={Inventario} options={{ title: 'Inventario' }} />
        </Stack.Navigator>
    )
}

export default InventarioStack