import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const table = 'marveldatabase';
const appModel = db.define(table,{
    Id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    charId: {type: DataTypes.INTEGER},
    charName : {type: DataTypes.STRING},
    charDescrip : {type: DataTypes.STRING},
    charImg : {type: DataTypes.STRING},
    charUrls : {type : DataTypes.STRING},
    createdAt : {type : DataTypes.DATE},
    updatedAt: {type : DataTypes.DATE}
});

export { appModel };