import express from 'express'
import SteamLogin from '../resolvers/steam/SteamLogin.js'
import SteamReturn from '../resolvers/steam/SteamReturn.js'
const route = express.Router()
route.get('/login',SteamLogin)
route.get('/return',SteamReturn)





export default route