const Post = require('../models/Post');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
exports.createPost = async (req, res) => {
  try {
    const { title, discription, content, videos } = req.body;
    const images = req.files; // multer adds a 'files' object to the request
    const post = await Post.create({
      title,
      discription,
      content,
      images: images.map(file => `${file.path}`), // save the path of the uploaded files
      videos: videos ? videos.split(',') : [],
      author: req.session.user._id
    });
    res.redirect('/posts')
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};
  
  exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find().populate('author', 'username');
      const user = req.session.user ? req.session.user : null;
    res.render('allPosts', { posts, user });
    } catch (err) {
      res.status(400).json({
        status: 'error',
        message: err.message
      });
    }
  };
  
  exports.getPost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('author', 'username');
      const user = req.session.user ? req.session.user : null;
      res.render('post', { post,user });
    } catch (err) {
      res.status(400).json({
        status: 'error',
        message: err.message
      });
    }
  };
  