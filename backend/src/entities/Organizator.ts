import db from '../dbConfig';
import Sequelize from 'sequelize';
import { ModelDefined } from 'sequelize';
import { ConferintaAttributes } from './Conferinta';
import { ReviewerAttributes } from './Reviewer';


export interface OrganizatorAttributes{
    OrganizatorId : number,
    OrganizatorName: string,
    OrganizatorSurName: string,
    Conferinta: ConferintaAttributes[],
    Reviewer: ReviewerAttributes[] 
   
}

export interface OrganizatorCreationAttributes extends OrganizatorAttributes {}

const Organizator : ModelDefined<OrganizatorAttributes, OrganizatorCreationAttributes> = db.define("Organizator", 
{
    OrganizatorId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    OrganizatorName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    OrganizatorSurName:
    {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default Organizator;