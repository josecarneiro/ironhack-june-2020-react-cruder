import React, { Component } from 'react';
import { listPosts } from './../services/post';
import { Link } from 'react-router-dom';

class HomeView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      posts: []
    };
  }

  componentDidMount() {
    listPosts()
      .then(data => {
        const posts = data.posts;
        this.setState({
          posts,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div class="post-list">
        {this.state.posts.map(post => (
          <Link to={`/post/${post._id}`} key={post._id} className="post-item">
            <strong>{post.content}</strong>
            <br />
            <small>{post.creationDate}</small>
          </Link>
        ))}
      </div>
    );
  }
}

export default HomeView;
