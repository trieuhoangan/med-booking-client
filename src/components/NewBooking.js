import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

import '../css/App.css';

class NewBooking extends Component {
    
    //Hàm khởi tạo
    constructor(props) {
        super(props);
        this.state = {
            domain: 'http://localhost:8080',
            id: '',
            name: '',
            phonenumber: '',
        }
    }
    //TODO Bắt sự kiện thay đổi trường input
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name]: value
        })
    }

    onClearForm = () => {
        this.setState({
            name: '',
            phonenumber: '',
        })
    }

    onSubmit = (event) => {
        //chặn submit lên url
        event.preventDefault();
        var form_object=  {
            id: "",
            name: this.state.name,
            phoneNumber: this.state.phonenumber,
            code: "",
            time: "",
            status: "",
            place: "",
            day: "",
            result: "",
        }
        axios
            .post(
                this.state.domain + "/send_appointment",
                form_object,
                {
                    headers: { "content-type": "application/json", }
                }
            )
            .then(response => {
                if (response.data.status === "good") {
                    alert("đặt thành công buổi hẹn! Mã xác thực là " + response.data.code);
                    this.onClearForm();
                } else {
                    alert("Lỗi!");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
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

        return(
            <div>
                {/* sidebar */}
                <div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
                    <div className="divider"></div>
                    <ul className="nav menu">
                        <li>
                            {dashboard}
                        </li>
                        <li className="active">
                                <Link to="/NewBooking">
                                    <em className="fa fa-dashboard">
                                        &nbsp;
                                    </em>
                                    Đặt lịch khám
                                </Link>
                            </li>
                        <li>
                            <Link to="/CancelBooking">
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Hủy lịch khám
                            </Link>
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
                            <li className="active">Đặt lịch</li>
                        </ol>
                    </div>
                    <div>
                        <h1>
                            Form đặt lịch
                        </h1>
                        <div className="panel panel-info col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="panel-heading">
                                <h3 className="panel-title">
                                    Đặt lịch khám bệnh
                                    &nbsp;
                                </h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={this.onSubmit}>                                   
                                        {/* Họ Tên (input) */}
                                        <div className="form-group">
                                            <label>Họ và tên</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                id=""
                                                placeholder="họ và tên của bạn"
                                                value={this.state.name}
                                                onChange={this.onChange} />
                                        </div>

                                        {/* Số điện thoại (input) */}
                                        <div className="form-group">
                                            <label>Số điện thoại</label>
                                            <input
                                                type="text"
                                                name="phonenumber"
                                                className="form-control"
                                                id=""
                                                placeholder="số điện thoại"
                                                value={this.state.phonenumber}
                                                onChange={this.onChange} />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={!this.state.name
                                                || !this.state.phonenumber}
                                            >
                                            <span className="fa fa-check mr-5"></span>
                                            Xác nhận
                                        </button>
                                        &nbsp;
                                        <button 
                                            type="button" 
                                            className="btn btn-warning"
                                            onClick={this.onClearForm}>
                                            Đặt lại
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
export default NewBooking;