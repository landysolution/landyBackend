import express from 'express'
import GetCafes from '../resolvers/cafe/GetCafes.js';
import GetPcs from '../resolvers/cafe/GetPcs.js';
const route = express.Router()

route.get('/', GetCafes)
route.get('/pcs/:id', GetPcs)

export default route;