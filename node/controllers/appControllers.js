import { appModel } from '../models/appModel.js';
import axios from "axios";

// Método para obtener todos los personajes
export const getAllCharacters = async (req, res) => {
    try {
        const response = await axios.get('http://gateway.marvel.com/v1/public/characters', {
            params: {
                apikey: 'e11c96dbc59dbee675424933880fba29',
                ts: "1",
                hash: "bf82831084ac8e9ef97c5b86454e2926"
            }
        });
        const characters = response.data.data.results;
        res.json(characters);
    } catch (error) {
        console.error('Error al obtener datos de la API de Marvel', error);
        res.status(500).json({ message: 'Error al obtener datos de la API de Marvel' });
    }
};

// Método para obtener un personaje por su ID
export const getACharacterById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${id}`, {
            params: {
                apikey: 'e11c96dbc59dbee675424933880fba29',
                ts: "1",
                hash: "bf82831084ac8e9ef97c5b86454e2926"
            }
        });
        const character = response.data.data.results[0];
        res.json(character);
    } catch (error) {
        console.error('Error al obtener datos del personaje desde la API de Marvel', error);
        res.status(500).json({ message: 'Error al obtener datos del personaje desde la API de Marvel' });
    }
};

// Método para buscar personajes por su nombre
export const searchCharactersByName = async (req, res) => {
    const { name } = req.params;
    console.log(name);
    try {
        const response = await axios.get('http://gateway.marvel.com/v1/public/characters', {
            params: {
                apikey: 'e11c96dbc59dbee675424933880fba29',
                ts: "1",
                hash: "bf82831084ac8e9ef97c5b86454e2926",
                nameStartsWith: name
            }
        });
        const characters = response.data.data.results;
        const filteredCharacters = characters.filter(character =>
            character.name.toLowerCase().includes(name.toLowerCase())
        );
        res.json(filteredCharacters);
    } catch (error) {
        console.error('Error al obtener datos de la API de Marvel', error);
        res.status(500).json({ error: 'Error al obtener datos de la API de Marvel' });
    }
}

// Método para guardar un personaje como favorito
export const saveFavoriteCharacter = async (req, res) => {
    const { charId, charName, charDescrip, charImg, charUrls } = req.body;

    try {
        // Obtener la ID del personaje de Marvel y asignarla a charId
        const { data } = await axios.get(`http://gateway.marvel.com/v1/public/characters/${charId}`, {
            params: {
                apikey: 'e11c96dbc59dbee675424933880fba29',
                ts: "1",
                hash: "bf82831084ac8e9ef97c5b86454e2926"
            }
        });

        const marvelCharId = data.data.results[0].id;

        // Guardar el personaje como favorito en la base de datos
        const newFavorite = await appModel.create({
            charId: marvelCharId, // Asignar la ID de Marvel a charId
            charName,
            charDescrip,
            charImg,
            charUrls,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        res.status(201).json({ message: 'Agregado a Favoritos', newFavorite});
    } catch (error) {
        console.error('Error al guardar al personaje como favorito', error);
        res.status(500).json({ error: 'Error al guardar al personaje como favorito' });
    }
}

// Método para eliminar un personaje favorito por su ID
export const deleteFavoriteCharacterById = async (req, res) => {
    const { charId } = req.params;
    try {
        const deletedFavorite = await appModel.destroy({
            where: {
                charId: charId
            }
        });
        if (deletedFavorite === 0) {
            return res.status(404).json({ message: 'No se encontró el personaje con el ID proporcionado' });
        }
        res.status(200).json({ message: 'Personaje eliminado de Favoritos' });
    } catch (error) {
        console.error('Error al eliminar el personaje de Favoritos', error);
        res.status(500).json({ error: 'Error al eliminar el personaje de Favoritos' });
    }
}

// Método para obtener todos los personajes favoritos
export const getFavoriteCharacters = async (req, res) => {
    try {
        const favorites = await appModel.findAll();
        console.log(favorites);
        res.json(favorites);
    } catch (error) {
        console.error('Error al obtener los favoritos', error);
        res.status(500).json({ error: 'Error al obtener los favoritos' });
    }
}
