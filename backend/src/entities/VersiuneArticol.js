import Sequelize from 'sequelize';
import db from '../dbConfig.js';

const VersiuneArticol = db.define("VersiuneArticol", {
    VersiuneArticolId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ArticolId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Continut: {
        type: Sequelize.TEXT,
        allowNull: false
      }
})

export default VersiuneArticol;