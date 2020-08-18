const express = require('express');

const Post = require('./../models/post');

const postRouter = new express.Router();

postRouter.get('/list', (request, response, next) => {
  Post.find()
    .populate('creator')
    .sort({ creationDate: -1 })
    .then(posts => {
      response.json({ posts });
    })
    .catch(error => {
      next(error);
    });
});

postRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const post = await Post.findById(id).populate('creator');
    if (post) {
      response.json({ post });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

postRouter.post('/', (request, response, next) => {
  // let url;
  // if (request.file) {
  //   url = request.file.path;
  // }

  Post.create({
    content: request.body.content
    // photo: url
  })
    .then(post => {
      response.json({ post });
    })
    .catch(error => {
      next(error);
    });
});

postRouter.post('/:id/delete', async (request, response, next) => {
  const id = request.params.id;

  Post.findByIdAndDelete(id)
    .then(() => {
      response.json({});
    })
    .catch(error => {
      next(error);
    });
});

postRouter.post('/:id/edit', (request, response, next) => {
  const id = request.params.id;

  Post.findByIdAndUpdate(id, { content: request.body.content }, { new: true })
    .then(post => {
      response.json({ post });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = postRouter;
