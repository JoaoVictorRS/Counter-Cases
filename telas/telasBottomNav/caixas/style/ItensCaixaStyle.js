import { StyleSheet } from "react-native";

const ItensCaixaStyle = StyleSheet.create({
      header: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      imagem: {
        width: 200,
        height: 200,
        resizeMode: "contain"
      },
      container: {
        width: 150, // Largura do quadrado da skin
        height: 150, // Altura do quadrado da skin
        borderWidth: 2, // Largura da borda
        borderColor: 'black', // Cor da borda
        borderRadius: 10, // Para tornar o quadrado arredondado (ajuste conforme necessário)
        padding: 10, 
        backgroundColor: 'white',
        background: 'linear-gradient(180deg, rgba(47,47,47,1) 0%, rgba(108,108,118,1) 30%)'
      },
      skinImage: {
        width: '100%', // Preencher a largura do quadrado
        height: '70%', // Definir a altura da imagem
        resizeMode: 'cover', // Para preencher o espaço da imagem
      },
      skinName: {
        fontSize: 12, // Tamanho da fonte
        fontWeight: 'bold', // Estilo da fonte
      },
      skinPrice: {
        fontSize: 12, // Tamanho da fonte
      },
    
});

export default ItensCaixaStyle