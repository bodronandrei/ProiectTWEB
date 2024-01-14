import express from 'express';
import {createReviewer, getReviewerbyId, getReviewer, deleteReviewer, updateReviewer} from "../dataAccess/ReviewerDa"
import reviewerFilterDto from '../dataAccess/models/reviewerFilterDto';

let reviewerRouter = express.Router();
  
reviewerRouter.route('/reviewer').post( async (req, res) => {
  return res.json(await createReviewer(req.body));
})

reviewerRouter.route('/reviewer').get( async (req, res) => {  
  var queryParams = new reviewerFilterDto(req.query) 
  return res.json(await getReviewer(queryParams));
})

reviewerRouter.route('/reviewer/:id').get( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await getReviewerbyId(id));
})

reviewerRouter.route('/reviewer/:id').delete( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await deleteReviewer(id));
})

reviewerRouter.route('/reviewer/:id').put( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await updateReviewer(req.body, id));
})

export default reviewerRouter;