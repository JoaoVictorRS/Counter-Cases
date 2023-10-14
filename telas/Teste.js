import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import { Card, Text } from 'react-native-paper';
import CsAPI from '../services/CsAPI';

const Teste = ({navigation}) => {

    const [caixas, setCaixas] = useState([]);

    useEffect(() => {
        CsAPI.get('/crates/cases.json').then(resultado => {
            setCaixas(resultado.data)
        })
    }, []);

    return (
        <>
            <ScrollView>
                {caixas.map(item => (
                    <>
                        <Card key={item.id} style={{ margin: 10 }}>
                            <Card.Cover source={{ uri: item.image }} />
                            <Card.Content>
                                <Text variant="titleLarge">{item.name}</Text>
                            </Card.Content>
                        </Card>
                    </>
                ))}
            </ScrollView>
        </>
    )
}

export default Teste