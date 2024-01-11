import express from 'express';
import {getConferinta, getConferintaById, createConferinta, updateConferinta, deleteConferinta} from '../dataAccess/ConferintaDa.js';

let conferintaRouter = express.Router();

conferintaRouter.route('/conferinta').get(async (req, res) => {
    res.status(200).json(await getConferinta());
})

conferintaRouter.route('/conferinta/:id').get(async (req, res) => {
    res.status(200).json(await getConferintaById(req.params.id));
})

conferintaRouter.route('/conferinta').post(async (req, res) => {
    res.status(201).json(await createConferinta(req.body));
})

conferintaRouter.route('/conferinta/:id').put(async (req, res) => {
    let ret = await updateConferinta(req.body, req.params.id);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);
})

conferintaRouter.route('/conferinta/:id').delete(async (req, res) => {
    let ret = await deleteConferinta(req.params.id);

    if(ret.error)
        res.status(400).json(ret.error);
    else
        res.status(200).json(ret.obj);
})

export default conferintaRouter;