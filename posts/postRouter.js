const express = require('express');
const posts = require("./postDb")

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  posts.get(req.params.id)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    next(error)
  })
});

router.get('/:id', validatePostId(), (req, res) => {
  // do your magic!
  posts.getById(req.params.id)
  .then((post) => {
      res.json(post)
  })
  .catch((error) => {
    next(error)
  })
});

router.delete('/:id', validatePostId(), (req, res) => {
  // do your magic!
  posts.remove(req.params.id)
  .then((count) => {
    if (count > 0) {
      res.status(200).json({
        message: "The post has been deleted"
      })
    } else {
      res.status(404).json({
        message: "The post could not be found."
      })
    }
  })
  .catch((error) => {
    next(error)
  })
});

router.put('/:id', validatePostId(), (req, res) => {
  // do your magic!
  posts.update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({
          message: "The post could not be found."
        })
      }
    })
    .catch((error) => {
      next(error)
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  return (req, res, next) =>{
    posts.getById(req.params.id)
    .then((post) => {
      if (post) {
        req.post = post 
        next()
      } else {
        res.status(404).json({
          message: "Post not found."
        })
      }
    })
    .catch((error) => {
      next(error)
    })
  }
}

module.exports = router;
