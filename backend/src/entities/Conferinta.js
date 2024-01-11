import Sequelize from 'sequelize';
import db from '../dbConfig.js';

const Conferinta = db.define("Conferinta", {
    ConferintaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ConferintaName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ConferintaDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    ConferintaLocatie: {
        type: Sequelize.STRING,
        allowNull: false
    },
    OrganizatorID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Conferinta;