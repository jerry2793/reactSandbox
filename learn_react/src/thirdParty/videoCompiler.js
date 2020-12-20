import React, { Component } from 'react';
import Youtube from 'react-youtube';

class ReactYoutubeDemo extends Component {
    videoOnReady (event) {
        event.target.pauseVideo();
        console.log(event.target);
    }
    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 1
            }
        }
        const {videoId} = this.props;
        return (
             <Youtube
             videoId = {videoId}
            opts = {opts}
            onReady = {this.videoOnReady}
             />
        );
    }
}


export default ReactYoutubeDemo;