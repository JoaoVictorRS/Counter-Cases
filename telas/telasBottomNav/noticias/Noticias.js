import React from 'react'
import { useState } from 'react'
import SteamAPI from '../../../services/SteamAPI'
import { Text } from 'react-native-paper'
import { useEffect } from 'react'
import { ScrollView, View } from 'react-native'

const Noticias = () => {

    const [noticia, setNoticias] = useState([])

    useEffect(() => {
        SteamAPI.get('/GetNewsForApp').then(resultado => {
            const news = resultado.data.appnews.newsitems
            setNoticias(news)
        })
    }, [])

    console.log(noticia)
    return (
        <>
            <ScrollView>
                {noticia.map(item => (
                    <View key={item.gid}>
                        <Text>{item.title}</Text>
                        <Text>{item.contents}</Text>
                        <Text>{item.author}</Text>
                    </View>
                ))}
            </ScrollView>
        </>
    )
}

export default Noticias