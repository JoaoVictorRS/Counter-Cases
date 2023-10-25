import React, { useEffect, useState } from 'react'
import SteamUserAPI from '../../../services/SteamUserAPI';

const Inventario = ({navigation}) => {

  const [Inventario, setInventario] = useState([]);

  useEffect(() => {
    SteamUserAPI.get(`/inventory/${idUser}/730/2?l=english&count=5000`).then(resultado => {
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