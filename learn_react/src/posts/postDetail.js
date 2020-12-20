import React, { Component } from 'react';
// import BlogData from '../data/blog.json'

class PostDetail extends Component {
    constructor(props){
        super(props);
        this.titleClicked = this.titleClicked.bind(this);
        this.toggleContent = this.toggleContent.bind(this);
        this.state = {
            showContent: true
        }
    }
    toggleContent (event) {
        event.preventDefault();
        const {showContent} = this.state
        this.setState({
            // showContent: false; this cannot set t/f back forth
            // showContent: !showContent;
            showContent: !this.state.showContent

        })
    }
    titleClicked (event) {
        event.preventDefault();
        // alert("clicked!!")
        const {dataCallback} = this.props;
        if (dataCallback !== undefined) {
            dataCallback("hello world")
            console.log(dataCallback)
        }
    }
    render(){
    // attributes that are passed in from html tags in PostList
    const {post} = this.props;
    const {key} = this.props;
    // reading off from the constructor, as it is a class var
    const {showContent} = this.state;
    // const post = this.props.post; // this also works but it does not auto map like the previous
        return (
            <div class="article"> 
                <h1 onClick={this.titleClicked}>{ post.title }</h1>

                {/* contition, : means else statement */}
                { showContent === true ?
                <p>{ post.content }</p>
                : ""
                }
                <button onClick={this.toggleContent}>Toggle Content display</button>
            </div>
    );
  }
}

export default PostDetail;
