import express from 'express'
import getUser from '../resolvers/user/getUser.js'
import Logout from '../resolvers/user/Logout.js'
// import ProfileMW from '../middleware/ProfileMW.js'
const route = express.Router()
route.get('/me', getUser)
route.post('/logout',Logout)
export default route