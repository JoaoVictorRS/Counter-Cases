import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { Alert, StyleSheet, TextInput, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

const Login = ({ navigation }) => {

  const [idUser, setUser] = useState('')

   async function salvarid(){
    const user = {
      idUser
    }

    await AsyncStorage.setItem("Usuario", JSON.stringify(user));
    console.log(user)
  }

  //  async function mostrar(){
  //   const json = await AsyncStorage.getItem("user");
  //   const mostrarUser = JSON.parse(json);

  //   alert("O id de Usuario é: ", mostrarUser);
  // }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}></Text>
        <TextInput
        value={idUser}
          style={styles.input}
          placeholder="ID do usuário"
          onChangeText={text => setUser(text)}
        />
        <Button mode='outlined' onPress={salvarid()}>Entrar</Button>
        {/* <Button mode='outlined' onPress={mostrar()}>Alertar</Button> */}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Login