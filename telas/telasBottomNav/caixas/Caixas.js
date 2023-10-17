import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Avatar, Card, IconButton, Text } from 'react-native-paper'
import CsAPI from '../../../services/CsAPI';
import { View } from 'react-native';

const Caixas = ({ navigation }) => {

  const [caixas, setCaixas] = useState([]);

  useEffect(() => {
    CsAPI.get('/crates.json').then(resultado => {
      setCaixas(resultado.data)
    })
  }, []);

  console.log(caixas)
  return (
    <>
      <ScrollView>

        {caixas.map(item => (
          

            <Card key={item.id}>
              <Card.Title

                title={item.name}
                left={(props) => (
                  <Avatar.Image
                    {...props}
                    size={39}
                    source={{
                      uri: `${item.image}`,
                    }}
                  />


                )}
                right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => navigation.push()} />}

              />

            </Card>
        

        ))}


      </ScrollView >
    </>
  )
}

export default Caixas

