import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// item = async () => {
//     try {
//       // Recupere o ID do usuário do AsyncStorage
//       const userId = await AsyncStorage.getItem('usuario'); // Substitua 'userId' pelo nome da chave onde o ID do usuário está armazenado.
  
//       // Verifique se o ID do usuário foi recuperado com sucesso
//       if (!userId) {
//         console.error('ID do usuário não encontrado no AsyncStorage');
//         return null;
//       }
  
//     //   Configure o Axios com o ID do usuário como parâmetro
//       const SteamAPI = axios.create({
//         baseURL: 'http://localhost:3000',
//         params: {
//           idUser: userId,
//         },
//       });
  
//       return SteamAPI;
//     } catch (error) {
//       console.error('Erro ao configurar o Axios:', error);
//       return null;
//     }
//   };

const dado = AsyncStorage.getItem('usuario')

let idUser = {
    userid: `${dado}`
}


function salve(id){
    AsyncStorage.getItem(idUser.userid).then(resultado => {
        const idzi = JSON.parse(resultado) || []


      usuario.push(id)

      AsyncStorage.setItem('userid', JSON.stringify(idzi))
    })

  }

salve()




const SteamAPI = axios.create({
    baseURL: 'http://localhost:3000',
    params: {
        idUser: ''//Aqui a gente precisa puxar o id da pessoa que ela colocou no login
        //LEMBRAR DE APAGAR GLR DA PRODUÇÃO PELO AMOR DE DEUSSSSSSSSS
    }
})

export default SteamAPI