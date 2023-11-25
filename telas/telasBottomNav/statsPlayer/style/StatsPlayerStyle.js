import { StyleSheet } from "react-native";

const StatsPlayerStyle = StyleSheet.create({

    //ESTILIZAÇÃO DO PERFIL STEAM
    container_usuario: {
        backgroundColor: '#171d25',
        padding: '5%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 30
    },
    imagem_usuario: {
        width: 100,
        height: 100,
        borderWidth: 3,
        borderColor: '#6ccef5'
    },
    info_usuario: {
        marginLeft: '5%',
        alignSelf: 'center'
    },
    nome_usuario: {
        fontSize: '1.3rem',
        color: 'white'
    },
    pais_usuario: {
        width: 32,
        height: 32
    },
    botao_usuario: {
        marginLeft: '15%',
        alignSelf: 'center'
    },
    botao_conteudo: {
        alignContent: 'center',
        flexDirection: 'row',
    },
    botao_text: {
        fontSize: 16,
        marginRight: 5,
        alignSelf: 'center',
        color: 'white'
    },
    //ESTILIZAÇÃO DE INFORMAÇÕES DO CS
    principal_container: {
        flex: 1
    },
    horas_container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%'
    },
    kill_death_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    kill_death_linha: {
        borderLeftWidth: 1, // Espessura da linha
        borderLeftColor: 'black', // Cor da linha (preto neste exemplo, pode alterar para a cor desejada)
        height: 50, // Altura da linha (ajuste conforme necessário)
    },
    proporcao_kd_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
    },
    imagem_headshot:{
        width: 100, 
        height: 100, 
        marginLeft: 30, 
        alignSelf: 'center'
    },
    botao_kills:{
        marginTop: '12%',
        width: '50%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    view_vitorias:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        marginBottom: '5%'
    },
    view_defuse_plant:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})

export default StatsPlayerStyle