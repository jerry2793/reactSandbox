import React, { Component } from 'react';
import BlogData from '../data/blog.json'

import PostDetail from './postDetail'

class PostList extends Component {
  constructor(props){
    super(props);
    this.handleDataCallback = this.handleDataCallback.bind(this)
  }
  handleDataCallback(txtMsg) {
    console.log("data call back")
    // alert(txtMsg)
  }
  render(){
    return (
      <div className="App">
        <h1>Hello World!</h1>
        {/* map function used to interat through all of the data */}
        {/* blogDetail used to grab the content, it is an arb name */}
        { BlogData.map( (blogDetail,index) => {
          // pass in detail obj bc 
          return <PostDetail 
            post={blogDetail} 
            key={`post-list-key ${index}`}
            dataCallback={this.handleDataCallback}/>
        }
        ) }
      </div>
    );
  }
}

export default PostList;
