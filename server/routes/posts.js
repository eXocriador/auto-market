import {Router} from 'express'
import { checkAuth } from '../middleware/checkAuth.js'
import { 
  createPost, 
  getAll, 
  getById, 
  getMyPosts, 
  removePost, 
  updatePost,
  toggleLike
} from '../controllers/posts.js'

const router = new Router()

// Create Post
// http://localhost:3002/api/posts
router.post('/', checkAuth, createPost)

// Get all posts
// http://localhost:3002/api/posts
router.get('/', getAll)

// get my posts 
// http://localhost:3002/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts)

// get by id
// http://localhost:3002/api/posts/:id
router.get('/:id', getById)

// update post
// http://localhost:3002/api/posts/:id
router.put('/:id', checkAuth, updatePost)

// remove post
// http://localhost:3002/api/posts/:id
router.delete('/:id', checkAuth, removePost)

// toggle like
// http://localhost:3002/api/posts/:id/like
router.post('/:id/like', checkAuth, toggleLike)

export default router