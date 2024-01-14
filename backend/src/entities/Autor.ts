import db from '../dbConfig';
import Sequelize from 'sequelize';
import { ModelDefined } from 'sequelize';
import { ArticolAttributes } from './Articol';

export interface AutorAttributes{
    AutorId : number,
    AutorName: string,
    AutorSurname: string,
    ConferintaId: number,
    Articol: ArticolAttributes []
 
   
}

export interface AutorCreationAttributes extends AutorAttributes {}

const Autor : ModelDefined<AutorAttributes, AutorCreationAttributes> = db.define("Autor", 
{
    AutorId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    AutorName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    AutorSurname:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    ConferintaId:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Autor;