
import React, { useState, useEffect, } from 'react';
import axios from 'axios';

const URI = 'http://localhost:8000/marvels';

const CardDetails = ({ character }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`${URI}/favorites/${character.id}`);
        setIsFavorite(false);
      } else {
        await axios.post(`${URI}/favorites`, character);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error al cambiar el estado de Favorito:', error);
    }
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await axios.get(`${URI}/favorites/${character.id}`);
        checkFavoriteStatus(response.data.favorite);
        console.log(response)
      } catch (error) {
        console.error('Error al chequear estado de Favorito:', error);
      }
    }
  });



  return (
    <div>
      <h2>{character.name}</h2>
      <p>{character.description}</p>
        <button onClick={handleFavoriteToggle}>
        {isFavorite ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
      </button>
    </div>
  );
};

export default CardDetails; 
