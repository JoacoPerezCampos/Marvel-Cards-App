import React, { useState } from 'react';
import axios from 'axios';

const URI = 'http://localhost:8000/marvels';

const Sidebar = ({ onCharacterClick }) => {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  const handleCharacterClick = (character) => {
    onCharacterClick(character);
  };

  const handleRemoveFavorite = async (characterId) => {
    try {
      // Delete from favorites
      await axios.delete(`${URI}/marvels/favorites/${characterId}`);
      setFavoriteCharacters(favoriteCharacters.filter((character) => character.id !== characterId));
    } catch (error) {
      console.error('Error al eliminar de Favoritos:', error);
    }
  };

  return (
    <div className="sidebar p-5 text-center">
      <div className="sidebar-content">
        <a className="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          Favoritos
        </a>
        <div className="collapse" id="collapseExample">
          <div className="card card-body">
            <ul>
              {favoriteCharacters.map((character) => (
                <li key={character.id}>
                  <img src={character.thumbnail} alt={character.name} />
                  <button onClick={() => handleRemoveFavorite(character.id)}>Eliminar</button>
                  <span onClick={() => handleCharacterClick(character)}>{character.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;