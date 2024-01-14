import Sequelize , { ModelDefined } from 'sequelize';
import db from '../dbConfig';
import { FeedbackAttributes } from './Feedback';


export interface ReviewerAttributes{
    ReviewerId: number,
    ReviewerName: string,
    ReviewerSurname: string,
    ArticolId:number,
    Feedback: FeedbackAttributes [],
    OrganizatorId: number
}
export interface ReviewerCreationAttributes extends ReviewerAttributes {}


   
const Reviewer: ModelDefined<ReviewerAttributes, ReviewerCreationAttributes> = db.define("Reviewer", 
{ ReviewerId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ReviewerName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ReviewerSurname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ArticolId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    OrganizatorId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})

export default Reviewer;