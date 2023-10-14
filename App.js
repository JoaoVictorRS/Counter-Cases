import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Telas
import Login from './telas/Login';
import principalBottomNav from './telas/telasBottomNav/PrincipalBottomNav';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="login" component={Login} options={{ title: 'Login' }} />
            <Stack.Screen name="principal-bottom-nav" component={principalBottomNav} options={{ title: 'Counter-Stats' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}