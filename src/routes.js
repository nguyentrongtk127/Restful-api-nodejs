const express = require('express')
const router = express.Router()

const {
    userController,
    authController,
    articlesController,
    commentsController,
} = require('./controllers')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/profile', authController.auth, userController.getProfile)

router.get('/article', articlesController.getArticles)
router.get('/article/:_id', articlesController.getArticle)
router.post('/article', authController.auth, articlesController.createArticle)
router.put('/article', authController.auth, articlesController.updateArticle)
router.delete('/article/:_id', authController.auth, articlesController.deleteArticle)

router.get('/comment', commentsController.getComments)
router.post('/comment', authController.auth, commentsController.createComment)
router.put('/comment', authController.auth, commentsController.updateComment)
router.delete('/comment/:_id', authController.auth, commentsController.deleteComment)


module.exports = router