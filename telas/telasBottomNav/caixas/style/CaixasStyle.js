import { StyleSheet } from "react-native";

const CaixasStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        padding: '5%'
    },
    card: {
        width: '47%',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 1,
        elevation: 2,
        alignItems: 'center',
        padding: 16,
        marginBottom: '5%'
      },
      image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'

      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});

export default CaixasStyles