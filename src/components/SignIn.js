import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

class SignIn extends Component {
    constructor(){
        super();
        this.state = {
            user: {
                userName: "",
                password: ""
            },
            redirect: false
        }
    }


    handleChange = (e) => {
        let updatedUser = {...this.state.user};
        let inputField = e.target.name;
        let inputValue = e.target.value;
        updatedUser[inputField] = inputValue;
        this.setState({user: updatedUser});
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.LogIn(this.state.user);
        this.setState({redirect: true});
    }

    render() {
        if(this.state.redirect){
            return (<Redirect to="/userProfile"/>)
        }
        return (
            <div className="container marginHelper">
            <div className="signInCon">
            <Link to="/">
            <img src="https://image.shutterstock.com/image-vector/vector-flat-illustration-bank-building-600w-1081351790.jpg" alt="bankimage" className="logo"/>
            </Link> 
            
            <h1 className="marginHelperSmall">Sign In</h1>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="userName">Username </label>
                    <input type="text" name="userName" onChange={this.handleChange} value={this.state.user.userName} />
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input type="password" name="password"/>
                </div>
                <button>Log In</button>
            </form>
            </div>

            </div>
        )
    }
}

export default SignIn;