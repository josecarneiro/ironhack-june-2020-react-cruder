import React, { Component } from 'react';
import { listPosts } from './../services/post';
import PostItem from '../components/Post';

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
      <div className="post-list">
        {this.state.posts.map(post => (
          <PostItem {...post} key={post._id} />
        ))}
      </div>
    );
  }
}

export default HomeView;
