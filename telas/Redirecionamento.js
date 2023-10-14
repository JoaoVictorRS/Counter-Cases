import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Login from './Login';
import principalBottomNav from './telasBottomNav/PrincipalBottomNav';

const Stack = createNativeStackNavigator();

const Redirecionamento = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="login" component={Login} options={{ title: 'Login' }} />
                <Stack.Screen name="principal-bottom-nav" component={principalBottomNav} options={{ title: 'Counter-Stats' }} />
            </Stack.Navigator>
        </>
    )
}

export default Redirecionamento