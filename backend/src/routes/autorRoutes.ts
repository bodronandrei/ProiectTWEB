import express from 'express';
import {createAutor, getAutorByid, getAutor, deleteAutor, updateAutor} from "../dataAccess/AutorDa"
import autorFilterDto from '../dataAccess/models/autorFilterDto';

let autorRoutes = express.Router();
  
autorRoutes.route('/autor').post( async (req, res) => {
  return res.json(await createAutor(req.body));
})

autorRoutes.route('/autor').get( async (req, res) => {  
  var queryParams = new autorFilterDto(req.query) 
  return res.json(await getAutor(queryParams));
})

autorRoutes.route('/autor/:id').get( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await getAutorByid(id));
})

autorRoutes.route('/autor/:id').delete( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await deleteAutor(id));
})

autorRoutes.route('/autor/:id').put( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await updateAutor(req.body, id));
})

export default autorRoutes;