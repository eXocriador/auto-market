// routes/users.js
import { Router } from 'express'
import { getUserById } from '../controllers/users.js'

const router = new Router()

// http://localhost:3002/api/users/:id
router.get('/:id', getUserById)

export default router
