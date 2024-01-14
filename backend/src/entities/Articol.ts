import Sequelize , { ModelDefined } from 'sequelize';
import db from '../dbConfig';


export interface ArticolAttributes{
    ArticolId: number,
    ArticolTitle: string,
    ArticolStare: string,
    Continut: string,
    ConferintaId: number,
    AutorId:number,
    ReviewerId:number,
    FeedbackId:number
}
export interface ArticolCreationAttributes extends ArticolAttributes {}


   
const Articol: ModelDefined<ArticolAttributes, ArticolCreationAttributes> = db.define("Conferinta", 
{
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
        type: Sequelize.STRING,
        allowNull: false
    },
    Continut: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    ConferintaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    AutorId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ReviewerId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    FeedbackId: {
        type: Sequelize.INTEGER,
        allowNull: true
    }

})

export default Articol;