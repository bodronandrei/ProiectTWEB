import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import db_init from './entities/db_init';
import organizatorRouter from './routes/organizatorRoutes';
import reviewerRouter from './routes/reviewerRoutes';
import autorRouter from './routes/autorRoutes';
import createDbRouter from './routes/createDBRoutes';

env.config();

let app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));



const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,PATCH,POST,DELETE'
  };
  
app.use(cors(corsOptions));
db_init();
app.use("/api", createDbRouter);
app.use("/api/organizator", organizatorRouter);
app.use("/api/reviewer", reviewerRouter);
app.use("/api/autor", autorRouter);

let port = process.env.PORT || 8000;
app.listen(port);
console.log(`Server is running at ${port}`);