import express from 'express'
import GetCafes from '../resolvers/cafe/GetCafes.js';
import GetPcs from '../resolvers/cafe/GetPcs.js';
import GetComments from '../resolvers/cafe/GetComments.js';
const route = express.Router()

route.get('/', GetCafes)
route.get('/pcs/:id', GetPcs)
route.get('/comments/:id',GetComments)
export default route;