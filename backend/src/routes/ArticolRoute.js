import express from 'express';
import {getArticole, getArticolById, createArticol, updateArticol, deleteArticol} from '../dataAccess/ArticolDa.js';

let articolRouter = express.Router();

articolRouter.route('/articol').get(async (req, res) => {
    res.status(200).json(await getArticole());
})

articolRouter.route('/articol/:id').get(async (req, res) => {
    res.status(200).json(await getArticolById(req.params.id));
})

articolRouter.route('/articol').post(async (req, res) => {
    res.status(201).json(await createArticol(req.body));
})

articolRouter.route('/articol/:id').put(async (req, res) => {
    let ret = await updateArticol(req.body, req.params.id);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);
})

articolRouter.route('/articol/:id').delete(async (req, res) => {
    let ret = await deleteArticol(req.params.id);

    if(ret.error)
        res.status(400).json(ret.error);
    else
        res.status(200).json(ret.obj);
})

export default articolRouter;