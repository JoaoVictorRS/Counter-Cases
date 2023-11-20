import { StyleSheet } from "react-native";

const StatsPlayerStyle = StyleSheet.create({

    //ESTILIZAÇÃO DO PERFIL STEAM
    container_usuario: {
        backgroundColor: '#171d25',
        padding: '5%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    imagem_usuario:{
        width: 100,
        height: 100,
        borderWidth: 3,
        borderColor: '#6ccef5'
    },
    info_usuario:{
        marginLeft: '5%',
        alignSelf: 'center'
    },
    nome_usuario:{
        fontSize: '2rem',
        color: 'white'
    },
    pais_usuario:{
        width: 32,
        height: 32
    },
    //ESTILIZAÇÃO DE INFORMAÇÕES DO CS
    

})

export default StatsPlayerStyle