import React, { Component } from 'react';
import PostList from './posts/postList';
import ReactYoutubeDemo from './thirdParty/videoCompiler'
import MarkDown from './thirdParty/markdown'
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  // https://youtu.be/_nBlN9yp9R8
  render(){
    const inputMD = "#hello MD!\n\n *important*: hi!";
    return (
      <div className="App">
        <PostList />
        {/* <ReactYoutubeDemo videoId='_nBlN9yp9R8' /> */}
        <MarkDown input={inputMD} />
      </div>
    );
  }
}

export default App;
