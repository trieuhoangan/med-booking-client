import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

import '../css/App.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            token: '',
            domain: 'http://localhost:8080',
        }
    }


    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name]: value
        })
    }

    handleLogin = (event) => {
        //chặn submit lên url
        event.preventDefault();
        //API Authentication
        axios
            .post(
                this.state.domain + "/login",
                {
                    username: this.state.username,
                    password: this.state.password,
                },
                {
                    headers: { "content-type": "application/json" }
                }
            )
            .then(response => {
                if (response.data.token === null) {
                    alert("Tài khoản hoặc mật khẩu không đúng");
                    // localStorage.setItem("token", JSON.stringify("lfkjajhdjfahkjdshf"));
                } else {
                    //Login thành công
                    localStorage.setItem("token",response.data.token);
                    //Thay path /login -> /HomeAdmin khi event login thanh cong                    
                    this.props.history.replace('/HomeAdmin');                    
                }
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        // //Fake authen
        // localStorage.setItem("token", JSON.stringify("lfkjajhdjfahkjdshf"));
        // this.props.history.replace('/HomeAdmin'); 

    }
    render() {
        return(
            <div className="row mt-30p">
            <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
                {/* login form */}
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">Đăng nhập</div>
                    <div className="panel-body">
                        <form className="form">
                            <fieldset>
                                <div className="form-group">
                                    {/* input usrname */}
                                    <input 
                                        className="form-control" 
                                        placeholder="Tài khoản" 
                                        name="username" 
                                        type="username" 
                                        value={this.state.username}
                                        onChange={this.onChange}/>
                                </div>

                                <div className="form-group">
                                    {/* input passwd */}
                                    <input 
                                        className="form-control" 
                                        placeholder="Mật khẩu" 
                                        name="password" 
                                        type="password" 
                                        value={this.state.password}
                                        onChange={this.onChange}/>
                                </div>

                                {/* login btn */}
                                <Link to='/HomeAdmin'>
                                <button  
                                    className="btn btn-primary"
                                    onClick={this.handleLogin}>
                                    Đăng nhập
                                </button>
                                </Link>
                                &nbsp;
                                <Link to="/">
                                <button  
                                    className="btn btn-warning float-r">
                                    Về trang chủ
                                </button>
                                </Link>
                            </fieldset>
                        </form>
                    </div>
                </div>
            {/* /.col */}
            </div>
        {/* /.row */}
        </div>
        );    
    }
}
export default Login;