import Sequelize from 'sequelize';
import db from '../dbConfig.js';

const Utilizator = db.define("Utilizator", {
    UtilizatorId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    UtilizatorName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    UtilizatorPassword: {
        type: Sequelize.STRING,
        allowNull: false
    },
    UtilizatorEmail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    UtilizatorRole: {
        type: Sequelize.ENUM('organizator', 'reviewer', 'autor'),
        allowNull: false
    },
    ConferintaID: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
})

export default Utilizator;