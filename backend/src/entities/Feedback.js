import Sequelize from 'sequelize';
import db from '../dbConfig.js';

const Feedback = db.define("Feedback", {
    FeedbackId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    FeedbackStare: {
        type: Sequelize.ENUM('in asteptare', 'aprobat', 'respins'),
        allowNull: false,
        defaultValue: 'in asteptare'
    },
    FeedbackContinut: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    ArticolID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ReviewerID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Feedback;