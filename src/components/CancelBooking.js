import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

import '../css/App.css';

class CancelBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: 'http://localhost:8080',
            status: '',
            code: '',
        }
    }

    //TODO Bắt sự kiện thay đổi trường input
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        // if (name === 'type') {
        //     value = target.value === "true" ? true : false;
        // }

        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        //chặn submit lên url
        event.preventDefault();
        axios
            .post(
                this.state.domain + "/cancel_appointment",
                {
                    status: this.state.status,
                    code: this.state.code,
                },
                {
                    headers: { "content-type": "application/json" }
                }
            )
            .then(response => {
                if (response.data.status === "good") {
                    alert("Hủy thành công buổi hẹn");
                } else {
                    alert("Lỗi! Mã xác thực không đúng");
                }
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // xóa token và đăng xuất
    signOut = () => {
        // console.log(localStorage.getItem("token"));
        localStorage.removeItem("token");
    }
    
    render() {

        //Điều hướng trang chủ private/public
        var dashboard;
        if (localStorage.getItem('token') !== null) {
            dashboard = <Link to="/HomeAdmin">
                            <em className="fa fa-dashboard">
                                &nbsp;
                            </em>
                            Trang chủ
                        </Link>
        } else {
            dashboard = <Link to="/">
                            <em className="fa fa-dashboard">
                                &nbsp;
                            </em>
                            Trang chủ
                        </Link>
        }
        
        //hiển thị login/logout theo trạng thái hiện tại
        var logInOutButton;
        if (localStorage.getItem('token') !== null) {
            logInOutButton = <Link to="/" onClick={this.signOut}>
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Đăng xuất
                            </Link>
        } else {
            logInOutButton = <Link to="/Login" >
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Đăng nhập (Admin only)
                            </Link>
        }


        return(
            <div>
                {/* sidebar */}
                <div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
                    <div className="divider"></div>
                    <ul className="nav menu">
                        <li>
                            {dashboard}
                        </li>
                        <li>
                            <Link to="/NewBooking">
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Đặt lịch khám
                            </Link>
                        </li>
                        <li className="active">
                            <Link to="/CancelBooking">
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Hủy lịch khám
                            </Link>
                        </li>
                        <li>
                            {logInOutButton}
                        </li>
                    </ul>
                    {/* /.sidebar */}             
                </div>

                <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                    {/* /.main */}
                    <div className="mt-60 row">
                        <ol className="breadcrumb">
                            <li>
                                <em className="fa fa-home"></em>
                            </li>
                            <li>Dashboard</li>
                            <li className="active">Hủy lịch</li>
                        </ol>
                    </div>
                    <div>
                        <h1>
                            Queo căm tu hủy lịch
                        </h1>
                        <div className="panel panel-info col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="panel-heading">
                                <h3 className="panel-title">
                                    Huỷ lịch khám bệnh
                                    &nbsp;
                                </h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={this.onSubmit}>                                   
                                        {/* Họ Tên (input) */}
                                        <div className="form-group">
                                            <label>Mã xác thực</label>
                                            <input
                                                type="text"
                                                name="code"
                                                className="form-control"
                                                id=""
                                                placeholder="mã xác thực của buổi hẹn"
                                                value={this.state.code}
                                                onChange={this.onChange} />
                                        </div>
                                        {/* Button hoàn tất  */}
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={!this.state.code}
                                        >
                                            <span className="fa fa-check mr-5"></span>
                                            Xác nhận
                                        </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* /.main */}
                </div>
            </div>
        );
    }
}
export default CancelBooking;