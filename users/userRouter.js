const express = require('express');
const users = require("./userDb")
const posts = require("../posts/postDb")

const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  // do your magic!
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) =>{
      next(error)
    })
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  // do your magic!
  req.body.user_id = req.params.id
  posts.insert(req.body)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((error) => {
      next(error)
    })      
});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      next(error)
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      next(error)
    })
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
  users.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The user has been deleted."
        })
      } else {
        res.status(404).json({
          message: "The user could not be found."
        })
      }
    })
    .catch((error) => {
      next(error)
    })
});

router.put('/:id', validateUserId(), (req, res) => {
  // do your magic!
  users.update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "The user could not be found."
        })
      }
    })
    .catch((error) =>{
      next(error)
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  return (req, res, next) =>{
    users.getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user 
        next()
      } else {
        res.status(404).json({
          message: "User not found."
        })
      }
    })
    .catch((error) => {
      next(error)
    })
  }
}

function validateUser(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        message: "Missing user data."
      })
    } else if (!req.body.name) {
      res.status(400).json({
        message: "Missing required name field."
      })
    }
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        message: "Missing post data."
      })
    } else if (!req.body.text) {
      res.status(400).json({
        message: "missing required text field."
      })
    }
    next()
  }
}

module.exports = router;
