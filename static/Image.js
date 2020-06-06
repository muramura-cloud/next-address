import React, { Component } from 'react';
import { connect } from 'react-redux';

class Image extends Component {
    style ={
        width:this.props.width + "px",
        height:this.props.height + "px",
        borderRadius:this.props.radius + "px",
    }
    constructor(props) {
        super(props);
        this.fname = this.props.fname;
    }

    render() {
        return (
            <img src={this.fname} style={this.style}/>
        );
    }
}

Image=connect((state)=>state)(Image);
export default Image;