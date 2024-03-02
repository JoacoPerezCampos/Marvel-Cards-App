import React, { useState } from 'react';
import axios from 'axios';

const URI = 'http://localhost:8000/marvels';

const Sidebar = ({ favoriteCharacters, onCharacterClick, setFavoriteCharacters }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCharacterClick = (character) => {
    onCharacterClick(character);
  };

  const handleRemoveFavorite = async (charId) => {
    try {
      await axios.delete(`${URI}/favorites/${charId}`);
      // Actualizar lista de favoritos después de eliminar uno
      const updatedFavorites = favoriteCharacters.filter((character) => character.charId !== charId);
      setFavoriteCharacters(updatedFavorites);
    } catch (error) {
      console.error('Error al eliminar de Favoritos:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="sidebar p-3">
      <div className="sidebar-content">
        <div className="btn btn-primary" onClick={toggleSidebar} role="button" aria-expanded={sidebarOpen} aria-controls="collapseExample">
          Favoritos
        </div>
        {sidebarOpen && (
          <div className="collapse show" id="collapseExample">
            <div className="card card-body">
              {favoriteCharacters.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {favoriteCharacters.map((character) => (
                    <li key={character.charId} className="list-group-item">
                      <div className="d-flex align-items-center">
                        <img src={character.charImg} alt={character.charName} className="rounded-circle me-3" style={{ width: '50px', height: '50px' }} />
                        <span onClick={() => handleCharacterClick(character)}>{character.charName}</span>
                        <button className="btn btn-danger ms-auto" onClick={() => handleRemoveFavorite(character.charId)}>X</button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted text-center mt-3">No hay personajes en favoritos</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
