import React, { useEffect, useState } from 'react'
import SteamAPI from '../../../services/SteamAPI';

const Inventario = ({navigation}) => {

  const [Inventario, setInventario] = useState([]);

  useEffect(() => {

    AsyncStorage.getItem('usuario').then(usuario=>{

      SteamAPI.get(`/UserInventory?idUser=` + usuario).then(resultado => {
        const estats = resultado.data.playerstats.stats
        setInventario(resultado.data.descriptions)
      })
      
    })

  }, []);

  console.log(Inventario)

  return (
    <>

    </>
  )
}

export default Inventario