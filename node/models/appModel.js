import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const appModel = db.define("marveldatabase",{
    charId : {type: DataTypes.STRING},
    charName : {type: DataTypes.STRING},
    charDescrip : {type: DataTypes.STRING},
    charImg : {type: DataTypes.STRING},
    charUrls : {type : DataTypes.STRING},
});

export default appModel