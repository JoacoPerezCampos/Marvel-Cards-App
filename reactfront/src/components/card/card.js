// card.js

import React, { useState } from 'react';
import axios from 'axios';

const Card = ({ charId, thumbnail, name, description }) => {
  const imageUrl = `${thumbnail?.path}.${thumbnail?.extension}`;
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    // Utiliza el estado actualizado directamente dentro de la función de callback
    setIsFavorite(prevIsFavorite => {
      // Determina si el personaje debe ser agregado o eliminado de los favoritos
      if (!prevIsFavorite) {
        const charData = {
          charId: charId, // Copiar el ID de la API de Marvel a charId
          charName: name,
          charDescrip: description,
          charImg: imageUrl,
        };
        // POST solicitud
        axios.post('http://localhost:8000/marvels/favorites/', charData)
          .then(response => {
            console.log('Personaje agregado a favoritos:', response.data);
          })
          .catch(error => {
            console.error('Error al agregar el personaje a favoritos:', error);
            console.log(charData);
          });
      } else {
        // Si se desmarca como Favorito, eliminar de la base de datos
        axios.delete(`http://localhost:8000/marvels/favorites/${charId}`)
          .then(response => {
            console.log('Personaje eliminado de favoritos:', response.data);
          })
          .catch(error => {
            console.error('Error al eliminar el personaje de favoritos:', error);
          });
      }
      // Devolver el nuevo estado
      return !prevIsFavorite;
    });
  };

  // Texto y clase CSS dinámicos
  const favoriteText = isFavorite ? 'Eliminar de Favoritos' : 'Agregar a Favoritos';
  const favoriteIconClass = isFavorite ? 'fas fa-star' : 'far fa-star';
  const buttonClass = isFavorite ? 'btn btn-secondary m-1' : 'btn btn-primary m-1';

  return (
    <div className="card">
      <img src={imageUrl} alt={name} className="card-img-top" />
      <h5 className="card-title text-center m-3 p-2">{name}</h5>
      <div>
        <button type="button" className={buttonClass} onClick={toggleFavorite}>
          <span className={favoriteIconClass}></span>
          <span>{favoriteText}</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
