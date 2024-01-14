import Sequelize , { ModelDefined } from 'sequelize';
import db from '../dbConfig';


export interface ConferintaAttributes{
    ConferintaId: number,
    ConferintaName: string,
    ConferintaDate: Date,
    ConferintaLocatie: string,
    OrganizatorId: number
}
export interface ConferintaCreationAttributes extends ConferintaAttributes {}


   
const Conferinta: ModelDefined<ConferintaAttributes, ConferintaCreationAttributes> = db.define("Conferinta", 
{ ConferintaId: {
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
    OrganizatorId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Conferinta;