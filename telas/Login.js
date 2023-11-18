import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik';
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import ValidatorLogin from './ValidatorLogin';
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'react-native-web';

const Login = ({ navigation, route }) => {

  let usuario = {
    usuario: '76561198176113609'
  }

  function salvar(dados) {

    AsyncStorage.getItem('usuario').then(resultado => {

      const usuario = JSON.parse(resultado) || 0

      if (usuario.length > 0) {
        console.log('Há mais de um índice, não é permitido.');
        return; // Não permita salvar se houver mais de um índice
      }

      AsyncStorage.setItem('usuario', dados.usuario)

      navigation.replace('principal-bottom-nav')
    })

  }

  //Isso vai automatizar o processo de apagar o id do usuario, ao clicar em algum lugar pra voltar pro login apaga automaticamente
  useFocusEffect(
    React.useCallback(() => {
      // Função para remover o primeiro item do AsyncStorage
      const removerPrimeiroItem = async () => {
        try {
          // Obter todos os itens do AsyncStorage
          const todosItens = await AsyncStorage.getItem('usuario');
          const listaDeItens = JSON.parse(todosItens) || [];

          if (listaDeItens.length > 0) {
            // Remover o primeiro item (índice 0)
            listaDeItens.shift();

            // Salvar a lista atualizada no AsyncStorage
            await AsyncStorage.setItem('usuario', JSON.stringify(listaDeItens));

            console.log('Primeiro item removido com sucesso.');
          } else {
            console.log('Não há itens para remover.');
          }
        } catch (error) {
          console.error('Erro ao remover o primeiro item:', error);
        }
      }
      removerPrimeiroItem()
    }, [])
  )


  return (
    <>
      <View style={styles.container}>
      <Image style={styles.img} source={require('../imagens/logo.png')} />
        <Text style={styles.title}>Counter Strike 
        {'\n'}Status</Text>

        <Formik style={styles.input}
          initialValues={usuario}
          validationSchema={ValidatorLogin}
          onSubmit={values => salvar(values)}
        >
          {({ handleChange, handleBlur, values, handleSubmit, errors, touched }) => (
            <View>
              <TextInput
                mode='outlined'
                label="ID do Usuário"
                onBlur={handleBlur('usuario')}
                value={values.usuario}
                onChangeText={handleChange('usuario')}
              />
              {(touched.usuario && errors.usuario) &&
                <Text>
                  {errors.usuario}
                </Text>
              }
              <Button style={styles.butao} mode='outlined' onPress={handleSubmit}><Text style={styles.btt}>Entrar</Text></Button>
            </View>
          )}
        </Formik>
      </View>
    </>
  )
}



export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#999797'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#050505',
    textAlign: 'center'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#262626',
    color: '#050505'
  },
  butao: {
    borderRadius: 10,
    borderColor: '#f2f0f0',
    borderWidth: 1,
    backgroundColor: '#262626',
    marginTop: 15,
    
  },
  btt: {
   color: '#ffffff'
  },
  img: {
    width: 250,
    height: 100
  }
});