import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

const Login = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}></Text>
        <TextInput
          style={styles.input}
          placeholder="ID do usuário"
        />
        <Button mode='outlined' onPress={() => navigation.push('principal-bottom-nav')}>Entrar</Button>
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