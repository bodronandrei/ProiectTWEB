import express from 'express';
import {createOrganizator, getOrganizatorbyId, getOrganizator, deleteOrganizator, updateOrganizator} from "../dataAccess/OrganizatorDa"
import organizatorFilterDto from '../dataAccess/models/organizatorFilterDto';

let organizatorRouter = express.Router();
  
organizatorRouter.route('/organizator').post( async (req, res) => {
  return res.json(await createOrganizator(req.body));
})

organizatorRouter.route('/organizator').get( async (req, res) => {  
  var queryParams = new organizatorFilterDto(req.query) 
  return res.json(await getOrganizator(queryParams));
})

organizatorRouter.route('/organizator/:id').get( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await getOrganizatorbyId(id));
})

organizatorRouter.route('/organizator/:id').delete( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await deleteOrganizator(id));
})

organizatorRouter.route('/organizator/:id').put( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await updateOrganizator(req.body, id));
})

export default organizatorRouter;