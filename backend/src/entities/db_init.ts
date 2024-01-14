import mysql from 'mysql2/promise.js';
import env from 'dotenv';
import Articol from './Articol';
import Conferinta from './Conferinta';
import Feedback from './Feedback';
import Organizator from './Organizator';
import Reviewer from './Reviewer';
import Autor from './Autor';

env.config();
function createDatabase(){   
    mysql.createConnection({
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
    })
    .then((connection) => {   
    return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    })    
    .catch((err) => {
    console.warn(err.stack)
    })
}

function FK_Config(){
    Conferinta.belongsTo(Organizator, { foreignKey: 'OrganizatorId'});
    Organizator.hasMany(Conferinta, { foreignKey: 'OrganizatorId', as: 'Conferinte' });

    Reviewer.belongsTo(Organizator, { foreignKey: 'OrganizatorId' });
    Organizator.hasMany(Reviewer, { foreignKey: 'OrganizatorId', as: 'Reviewer' });

    Articol.belongsTo(Autor, { foreignKey: 'AutorId', as: 'Autor' });
    Autor.hasMany(Articol, { foreignKey: 'AutorId', as: 'Articole' });

    Feedback.belongsTo(Reviewer, { foreignKey: 'ReviewerId', as: 'Specialist' });
    Reviewer.hasMany(Feedback, { foreignKey: 'ReviewerId', as: 'Feedbackuri' });








    
    
    // Conferinta.belongsTo(Utilizator, { foreignKey: 'OrganizatorID', as: 'Organizator'});
    // Utilizator.hasMany(Conferinta, { foreignKey: 'OrganizatorID', as:'ConferinteOrganizate'});

    // Utilizator.hasMany(Articol, { foreignKey: 'AutorID', as: 'Articole'});

    // Articol.hasMany(ArticolRevieweri, { foreignKey: 'ArticolID', as: 'Revieweri'});

    // Utilizator.belongsToMany(ArticolRevieweri, { through: 'ArticolRevieweri', foreignKey: 'ReviewerID', as: 'RevieweriAsignati'});

    // Articol.hasMany(VersiuneArticol, { foreignKey: 'ArticolID', as: 'Versiuni' });

    // Articol.hasMany(Feedback, { foreignKey: 'ArticolID', as: 'Feedback-uri'});

    // Utilizator.hasMany(Feedback, { foreignKey: 'ReviewerID', as: 'Feedback-uri'});
}

function DB_Init(){
    createDatabase();
    FK_Config();
}

export default DB_Init;