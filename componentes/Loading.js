import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';



const Loading = () => {
    return (
        <>

            <View style={styles.container}>
                <ActivityIndicator size="small" color="#0000ff" />
                <Text style={styles.text}>Carregando...</Text>
            </View>



        </>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        marginTop: '50%'
    },
    text: {
        marginTop: 5,
    },
});