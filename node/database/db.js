import {Sequelize} from 'sequelize'

const db = new Sequelize('marveldatabase.app', 'root', '',{
    host : 'localhost',
    dialect: 'mysql'
})

export default db