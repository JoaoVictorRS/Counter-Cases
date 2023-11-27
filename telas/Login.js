import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import ValidatorLogin from './ValidatorLogin';
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'react-native';
import Modal from 'react-native-modal';

const Login = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('usuario').then(resultado => {
      if (resultado) {
        setUsuario(resultado);
      }
    });
  }, []);

  async function salvar(dados) {
    try {
      await AsyncStorage.setItem('usuario', dados.usuario);
      navigation.replace('principal-bottom-nav');
    } catch (error) {
      console.error('Erro ao salvar o ID do usuário:', error);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../imagens/logo.png')} />

        <Formik style={styles.input}
          initialValues={{usuario: usuario}}
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
                <Text style={{color: 'red'}}>
                  {errors.usuario}
                </Text>
              }
              <Button style={styles.butao} mode='outlined' onPress={handleSubmit}><Text style={styles.btt}>Entrar</Text></Button>
              <Button style={styles.botao_tutorial} mode='outlined' onPress={() => setModalVisible(true)}>
                <Text style={styles.btt}>Como pegar ID Steam</Text>
              </Button>
            </View>
          )}
        </Formik>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={{ textAlign: 'center' }}>Primeiro passo: Abra a steam, e clique no canto superior direito, onde aparece sua foto e nome.</Text>
            <Image style={styles.modalImage} source={require('../imagens/step1.png')} />
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>Segundo passo: Vai abrir uma caixa, clique na opção "Detalhes da conta"</Text>
            <Image style={styles.modalImage1} source={require('../imagens/step2.png')} />
            <Text style={{ textAlign: 'center', marginBottom: 5 }}>Terceiro Passo: Copie os numeros que aparecem após "ID Steam:"</Text>
            <Image style={styles.modalImage1} source={require('../imagens/step3.png')} />
            <Button style={styles.botao_modal} mode='outlined' onPress={() => setModalVisible(false)}>
              <Text style={styles.btt}>Fechar</Text>
            </Button>
          </View>
        </Modal>
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

  botao_modal: {
    borderRadius: 10,
    borderColor: '#f2f0f0',
    borderWidth: 1,
    backgroundColor: '#8b0000',
    marginTop: 15,

  },

  botao_tutorial: {
    borderRadius: 10,
    borderColor: '#f2f0f0',
    borderWidth: 1,
    backgroundColor: '#213a54',
    marginTop: 15,

  },

  btt: {
    color: '#ffffff'
  },
  img: {
    width: 250,
    height: 100,
    marginBottom: 40,
  },

  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

  modalImage: {
    resizeMode: 'center',
    width: 300, // ajuste de acordo com o tamanho desejado
    height: 100, // ajuste de acordo com o tamanho desejado
    marginBottom: 10,
  },

  modalImage1: {
    resizeMode: 'center',
    width: 300, // ajuste de acordo com o tamanho desejado
    height: 100, // ajuste de acordo com o tamanho desejado
    marginBottom: 10,
  }
});