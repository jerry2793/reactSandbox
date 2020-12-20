import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';

class MarkDown extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {input} = this.props;
        return (
             <ReactMarkdown
             input = {input}
             />
        );
    }
}

export default MarkDown;