import Sequelize from 'sequelize';
import db from '../dbConfig.js';

const Articol = db.define("Articol", {
    ArticolId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ArticolTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ArticolStare: {
        type: Sequelize.ENUM('in asteptare', 'in revizuire', 'aprobat', 'respins'),
        allowNull: false,
        defaultValue: 'in asteptare'
    },
    Continut: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    ConferintaID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    AutorID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    FeedbackID: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
})

export default Articol;