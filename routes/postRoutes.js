const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/new', upload.array('images'), postController.createPost);

router.get('/new', (req, res) => {
  const user = req.session.user ? req.session.user : null;
  if (user) {
    res.render('newPost');
  }
  else{
    res.redirect('/auth/login');
  }
    
  });
  

router.get('/', postController.getAllPosts);

router.get('/:id', postController.getPost);

module.exports = router;
