import express from 'express';
import {getUtilizator, getUtilizatorById, createUtilizator, updateUtilizator, deleteUtilizator} from '../dataAccess/UtilizatorDa.js';

let utilizatorRouter = express.Router();

utilizatorRouter.route('/utilizator').get(async (req, res) => {
    res.status(200).json(await getUtilizator());
})

utilizatorRouter.route('/utilizator/:id').get(async (req, res) => {
    res.status(200).json(await getUtilizatorById(req.params.id));
})

utilizatorRouter.route('/utilizator').post(async (req, res) => {
    res.status(201).json(await createUtilizator(req.body));
})

utilizatorRouter.route('/utilizator/:id').put(async (req, res) => {
    let ret = await updateUtilizator(req.body, req.params.id);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);
})

utilizatorRouter.route('/utilizator/:id').delete(async (req, res) => {
    let ret = await deleteUtilizator(req.params.id);

    if(ret.error)
        res.status(400).json(ret.error);
    else
        res.status(200).json(ret.obj);
})

export default utilizatorRouter;