import React, { useEffect, useState } from 'react'
import SteamAPI from '../../../services/SteamAPI';

const Inventario = ({navigation}) => {

  const [Inventario, setInventario] = useState([]);

  useEffect(() => {
    SteamAPI.get(`/UserInventory`).then(resultado => {
      setInventario(resultado.data.descriptions)
    })
  }, []);

  console.log(Inventario)

  return (
    <>

    </>
  )
}

export default Inventario