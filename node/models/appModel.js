import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const table = 'marveldatabase';
const appModel = db.define(table,{
    charId : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    charName : {type: DataTypes.STRING},
    charDescrip : {type: DataTypes.STRING},
    charImg : {type: DataTypes.STRING},
    charUrls : {type : DataTypes.STRING},
    createdAt : {type : DataTypes.DATE},
    updatedAt: {type : DataTypes.DATE}
});

const getFavoriteCharacters = async () => {
    try {
        const favoriteCharacters = await appModel.findAll();
        return favoriteCharacters;
    } catch (error) {
        throw new Error('Error al obtener los personajes favoritos de la base de datos:', error);
    }
};

export { appModel, getFavoriteCharacters };