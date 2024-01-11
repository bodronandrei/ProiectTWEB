import Sequelize from 'sequelize';
import db from '../dbConfig.js';

const ArticolRevieweri = db.define("ArticolRevieweri",
{
    ArticolID:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    ReviewerID:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    }
});

export default ArticolRevieweri;