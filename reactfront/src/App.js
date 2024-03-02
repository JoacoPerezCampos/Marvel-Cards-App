import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../src/components/header/header.js';
import CardList from '../src/components/cardsList/cardsList.js';
import Sidebar from '../src/components/sidebar/sidebar.js'; // Corregido: importar Sidebar desde el archivo correcto
import Footer from './components/footer/footer.js';

const URI = 'http://localhost:8000/marvels';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState([]);
  const [searchedCharacters, setSearchedCharacters] = useState([]);

  useEffect(() => {
    const getAllCharacters = async () => {
      try {
        const response = await axios.get(URI);
        setCharacters(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error al traer los personajes:', error);
      }
    };

    const getFavoriteCharacters = async () => {
      try {
        const response = await axios.get(`${URI}/favorites`);
        setFavoriteCharacters(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error al traer Favoritos:', error);
      }
    };

    getAllCharacters();
    getFavoriteCharacters();
  }, []);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="app">
      <Header setSearchedCharacters={setSearchedCharacters} />
      <div className="main">
        <CardList characters={searchedCharacters.length > 0 ? searchedCharacters : characters} onCharacterClick={handleCharacterClick} />
        <Sidebar favoriteCharacters={favoriteCharacters} onCharacterClick={handleCharacterClick} setFavoriteCharacters={setFavoriteCharacters} />

        {selectedCharacter}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default App;
