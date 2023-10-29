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
      caixaName: {
        fontSize: '1.3em',
        marginBottom: '8%',
        fontWeight: 'bold'
      },
      row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      linearMargin: {
        marginBottom: '2%',
      },
      container: {
        width: 150, // Largura do quadrado da skin
        height: 150, // Altura do quadrado da skin
        borderColor: 'blue', // Cor da borda
        padding: 10,
        borderLeftWidth: 5,
      },
      skinImage: {
        width: '100%', 
        height: '70%',
        resizeMode: 'contain', 
      },
      skinName: {
        fontSize: 12, // Tamanho da fonte
        fontWeight: 'bold', // Estilo da fonte
      },
      skinPrice: {
        fontSize: 12, // Tamanho da fonte
      },
      milSpecGrade: {
        borderColor: '#4f6aeb',
      },
      restricted: {
        borderColor: '#7f57c9',
      },
      classified: {
        borderColor: '#d12de6',
      },
      covert: {
        borderColor: '#df5150',
      },
      defaultStyle: {
        borderColor: 'black',
      },
    
});

export default ItensCaixaStyle