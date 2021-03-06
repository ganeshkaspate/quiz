import React, { Component } from 'react';
import { connect } from 'react-redux';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                Hi there..
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('state in header', state);
    return {
        token: state.login.token,
        jdListError: state.jdList.error,
        jdList: state.jdList.content
    }
}

export default connect(mapStateToProps)(HeaderComponent);