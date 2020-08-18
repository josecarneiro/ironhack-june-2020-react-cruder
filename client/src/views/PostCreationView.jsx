import React, { Component } from 'react';
import { createPost } from './../services/post';

class PostCreationView extends Component {
  constructor() {
    super();
    this.state = {
      content: ''
    };
  }

  handlePostCreation = event => {
    event.preventDefault();

    const content = this.state.content;
    const name = this.state.name;

    const body = { content, name };

    createPost(body)
      .then(data => {
        const post = data.post;
        const id = post._id;
        // Redirect user to single post view
        this.props.history.push(`/post/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handlePostCreation}>
          <label htmlFor="content-input">Post Content</label>
          <textarea
            id="content-input"
            placeholder="Write your post here..."
            name="content"
            value={this.state.content}
            onChange={this.handleInputChange}
          />
          <button>Create Post</button>
        </form>
      </div>
    );
  }
}

export default PostCreationView;
