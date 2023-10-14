import React from 'react'
import { Button, Text } from 'react-native-paper'

const Login = ({navigation}) => {
  return (
    <>
      <Text>PAGINA IDENTIFICACAO</Text>
      <Button mode='outlined' onPress={() => navigation.push('principal-bottom-nav')}>vai pra outra pag</Button>
    </>

  )
}

export default Login