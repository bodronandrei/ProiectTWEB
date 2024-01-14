import Sequelize, { ModelDefined } from 'sequelize';
import db from '../dbConfig';


export interface FeedbackAttributes{
    FeedbackId: number,
    FeedbackStare: string,
    FeedbackContinut: string,
    ArticolId:number,
    ReviewerId:number
    
}
export interface FeedbackCreationAttributes extends FeedbackAttributes {}


const Feedback : ModelDefined<FeedbackAttributes, FeedbackCreationAttributes> = db.define("Feedback", 
{
    FeedbackId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    FeedbackStare: {
        type: Sequelize.STRING,
        allowNull: false
    },
    FeedbackContinut: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    ArticolId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ReviewerId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Feedback;