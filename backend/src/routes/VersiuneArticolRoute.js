import express from 'express';
import { getVersiuniArticol, getVersiuneArticolById, createVersiuneArticol, updateVersiuneArticol, deleteVersiuneArticol } from '../dataAccess/VersiuneArticolDa.js';

let versiuneArticolRouter = express.Router();

// Endpoint pentru obținerea tuturor versiunilor articolelor
versiuneArticolRouter.route('/versiuniArticol').get(async (req, res) => {
    res.status(200).json(await getVersiuniArticol());
});

// Endpoint pentru obținerea unei versiuni specifice a unui articol
versiuneArticolRouter.route('/versiuniArticol/:id').get(async (req, res) => {
    res.status(200).json(await getVersiuneArticolById(req.params.id));
});

// Endpoint pentru crearea unei noi versiuni ale unui articol
versiuneArticolRouter.route('/versiuniArticol').post(async (req, res) => {
    res.status(201).json(await createVersiuneArticol(req.body));
});

// Endpoint pentru actualizarea unei versiuni ale unui articol
versiuneArticolRouter.route('/versiuniArticol/:id').put(async (req, res) => {
    let ret = await updateVersiuneArticol(req.body, req.params.id);

    if (ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);
});

// Endpoint pentru ștergerea unei versiuni ale unui articol
versiuneArticolRouter.route('/versiuniArticol/:id').delete(async (req, res) => {
    let ret = await deleteVersiuneArticol(req.params.id);

    if (ret.error)
        res.status(400).json(ret.error);
    else
        res.status(200).json(ret.obj);
});

export default versiuneArticolRouter;