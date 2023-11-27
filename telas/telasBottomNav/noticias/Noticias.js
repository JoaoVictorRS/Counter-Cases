import React from 'react'
import { useState } from 'react'
import SteamAPI from '../../../services/SteamAPI'
import { Button, Text } from 'react-native-paper'
import { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Linking } from 'react-native'

const Noticias = () => {

    const [noticia, setNoticias] = useState([])

    useEffect(() => {
        SteamAPI.get('/GetNewsForApp').then(resultado => {
            const news = resultado.data.appnews.newsitems
            setNoticias(news)
        })
    }, [])

    // Abre o link da noticia
    const abrirLinkNoticia = (link) => {
        if (link) {
          Linking.openURL(link);
        }
      };

    console.log(noticia)
    return (
        <>
            <ScrollView style={styles.container}>
                {noticia.map(item => (
                    <View key={item.gid} style={styles.caixanot}>
                        <Text style={styles.titulo}>{item.title}</Text>
                        <Text style={styles.texto}>{item.contents}</Text>
                        <Text style={styles.autor}>-{item.author}</Text>
                        <Button style={styles.btt} 
                        onPress={() => abrirLinkNoticia(item.url)}
                        ><Text style={{color: 'white'}}>Veja a Noticia Completa</Text></Button>
                    </View>
                ))}
            </ScrollView>
        </>
    )
}

export default Noticias

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#082e5e'
    },
    caixanot: {
        margin: 0,
        borderWidth: 1,
        borderColor: "#fcfafa",
        borderStyle: "solid",
        padding: 10
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#616161",
       
    },
    texto: {
        color: "#a19f9f",
        paddingTop: 10,
        fontSize: 16,
         fontStyle: "italic"
    },
    autor: {
        paddingTop: 5,
        fontSize: 13,
        color: "#616161",
    },
    btt: {
        alignSelf: "center",
        width: 250,
        height: 40,
        backgroundColor: "#022f78",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fcfafa",
        borderStyle: "solid",
    }

});