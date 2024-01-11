import express from 'express';
import env from 'dotenv';
// import DB_Init from './entities/DB_Init.js';
// import createDBRouter from './routes/createDBRouter.js';
// import articolRouter from './routes/ArticolRoute.js';
// import conferintaRouter from './routes/ConferintaRoute.js';
// import feedbackRouter from './routes/FeedbackRoute.js';
// import utilizatorRouter from './routes/UtilizatorRoute.js';
// import versiuneArticolRouter from './routes/VersiuneArticolRoute.js';

//https://github.com/cimpeanuionut/Seminar12ts/blob/main/backend/commands.txt

env.config();

let app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// DB_Init();

// app.use('/api', createDBRouter);
// app.use('/api', articolRouter);
// app.use('/api', conferintaRouter);
// app.use('/api', feedbackRouter);
// app.use('/api', utilizatorRouter);
// app.use('/api', versiuneArticolRouter);

let port = process.env.PORT || 8000;
app.listen(port);
console.log(`Server is running at ${port}`);