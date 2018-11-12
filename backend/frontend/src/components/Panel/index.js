import React, {PureComponent} from 'react'
import './style.css'
import axios from 'axios';
import * as Cookies from 'js-cookie'


class Panel extends PureComponent {
    state = {
        process: 0,
        message: this.props.state.message
    }

    render() {
        return this.props.state.show ? this.props.state.is_auth ? (
            <div className="Panel">
                <div className="ui button">Hello, {this.props.state.username}!</div>
                <div className="ui button clickable disable-select" onClick={this.signOut} >Sign out</div>
            </div>
        ) : (
            <div className="Panel">
                <div id="LogPanelTabs">
                    <div className={this.state.process === 0 ? "ui-selected LogPanelTab clickable lh" : "ui LogPanelTab clickable lh"} onClick={this.openSignUpTab}>Sign Up</div>
                    <div className={this.state.process === 1 ? "ui-selected LogPanelTab clickable lh" : "ui LogPanelTab clickable lh"} onClick={this.openSignInTab}>Sign In</div>
                    <div className={this.state.process === 2 ? "ui-selected LogPanelTab clickable lh_2line" : "ui LogPanelTab clickable lh_2line"} onClick={this.openResetPassTab}>Reset Password</div>
                </div>                
                {this.state.process === 0 ? (
                    <div className="LogForm">
                        <div id="email" className="ui button">Email</div>
                        <input className="button input" type="email" placeholder="Enter Email" id="signup-email"></input>
                        <div id="username" className="ui button">Username</div>
                        <input className="button input" type="text" placeholder="Enter Username" id="signup-username"></input>
                        <div id="password" className="ui button">Password</div>
                        <input className="button input" type="password" placeholder="Enter Password" id="signup-password"></input>
                        <button id="LogButt" className="ui button disable-select clickable" onClick={this.signUp}>Sign Up</button>
                    </div>
                ) : this.state.process === 1 ? (
                    <div className="LogForm">
                        <div id="username" className="ui button">Username</div>
                        <input id="signin-username" className="button input" type="text" placeholder="Enter Username"></input>
                        <div id="password" className="ui button">Password</div>
                        <input id="signin-password" className="button input" type="password" placeholder="Enter Password"></input>
                        <button id="LogButt" className="ui button disable-select clickable" onClick={this.signIn}>Sign In</button>
                    </div>
                ) : (
                    <div className="LogForm">
                        <div id="email" className="ui button">Email</div>
                        <input className="button input" type="email" placeholder="Enter Email" id="rp-email"></input>
                        <button id="LogButt" className="ui button disable-select clickable" onClick={this.resetPass}>Reset Password</button>
                    </div>
                )}
                <div className="ui-inverse message">{this.state.message}</div>
            </div>
        ) : (
            <div className="Panel"></div>)
    }

    openSignUpTab = () => this.setState({
        process: 0,
        message: null
    })

    openSignInTab = () => this.setState({
        process: 1,
        message: null
    })

    openResetPassTab = () => this.setState({
        process: 2,
        message: null
    })

    signOut = () => {
        axios.get('logout/')
        .then(response => {
            this.props.getProfile()
        })
    }

    signUp = () => {
        axios.post('signup/', {
            'username': document.getElementById('signup-username').value,
            'email': document.getElementById('signup-email').value,
            'password': document.getElementById('signup-password').value
        }, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        .then(response => {
            this.props.getProfile()
        })
    }

    signIn = () => {
        axios.post('signin/', {
            'username': document.getElementById('signin-username').value,
            'password': document.getElementById('signin-password').value
        }, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        .then(response => {
            this.props.getProfile()
        })
    }

    resetPass = () => {
        axios.post('resetpassword/', {'email': document.getElementById('rp-email').value}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        .then(response => {
            this.props.getProfile()
        })
    }
}


export default Panel

//<div id="regkey" className="ui button">Registration Key</div>
//<input className="button input" type="password" placeholder="Enter Registration Key" name="regkey" required></input>