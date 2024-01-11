import express from 'express';
import {getFeedback, getFeedbackById, createFeedback, updateFeedback, deleteFeedback} from '../dataAccess/FeedbackDa.js';

let feedbackRouter = express.Router();

feedbackRouter.route('/feedback').get(async (req, res) => {
    res.status(200).json(await getFeedback());
})

feedbackRouter.route('/feedback/:id').get(async (req, res) => {
    res.status(200).json(await getFeedbackById(req.params.id));
})

feedbackRouter.route('/feedback').post(async (req, res) => {
    res.status(201).json(await createFeedback(req.body));
})

feedbackRouter.route('/feedback/:id').put(async (req, res) => {
    let ret = await updateFeedback(req.body, req.params.id);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);
})

feedbackRouter.route('/feedback/:id').delete(async (req, res) => {
    let ret = await deleteFeedback(req.params.id);

    if(ret.error)
        res.status(400).json(ret.error);
    else
        res.status(200).json(ret.obj);
})

export default feedbackRouter;