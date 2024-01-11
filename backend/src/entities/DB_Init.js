import mysql from 'mysql2/promise.js';
import env from 'dotenv';
import Articol from './Articol.js';
import Conferinta from './Conferinta.js';
import Feedback from './Feedback.js';
import Utilizator from './Utilizator.js';
import VersiuneArticol from './VersiuneArticol.js';
import ArticolRevieweri from './ArticolRevieweri.js';

env.config();

function Create_DB() {
    let conn;

    mysql.createConnection({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    })
    .then((connection) => {
        conn = connection
        return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    })
    .then(() => {
        return conn.end();
    })
    .catch((err) => {
        console.warn(err.stack);
    })
}

function FK_Config(){
    Conferinta.belongsTo(Utilizator, { foreignKey: 'OrganizatorID', as: 'Organizator'});
    Utilizator.hasMany(Conferinta, { foreignKey: 'OrganizatorID', as:'ConferinteOrganizate'});

    Utilizator.hasMany(Articol, { foreignKey: 'AutorID', as: 'Articole'});

    Articol.hasMany(ArticolRevieweri, { foreignKey: 'ArticolID', as: 'Revieweri'});

    Utilizator.belongsToMany(ArticolRevieweri, { through: 'ArticolRevieweri', foreignKey: 'ReviewerID', as: 'RevieweriAsignati'});

    Articol.hasMany(VersiuneArticol, { foreignKey: 'ArticolID', as: 'Versiuni' });

    Articol.hasMany(Feedback, { foreignKey: 'ArticolID', as: 'Feedback-uri'});

    Utilizator.hasMany(Feedback, { foreignKey: 'ReviewerID', as: 'Feedback-uri'});
}

function DB_Init(){
    Create_DB();
    FK_Config();
}

export default DB_Init;