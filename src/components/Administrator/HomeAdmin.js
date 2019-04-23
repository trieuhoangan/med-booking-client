import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

import AppointmentList from './AppointmentList';

class HomeAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            domain: 'http://localhost:8080',
            form_object: [],
        }
    }

    getAPICheckOneApointment = () => {
        axios
            .post(
                this.state.domain + "/admin/check_one_appointment",
                {
                    id: 1,
                },
                {
                    headers: { 
                        "Authorization": this.state.token,
                        "content-type": "application/json", }
                }
            )
            .then(response => {
                if (response.data.form_object !== null) {
                    this.setState({
                        form_object: response.data.form_object,
                    })
                } else {
                    alert("Lỗi!");
                }
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        localStorage.removeItem("appointmentId");
    }

    getAPICheckAllAppointment = () => {
        var body_data=  {
            numberPage: 1,
            numberOfForm: 1,
        }
        axios
            .post(
                this.state.domain + "/admin/check_all_appointment",
                body_data,
                {
                    headers: { 
                        "Authorization": this.state.token,
                        "content-type": "application/json", }
                }
            )
            .then(response => {
                this.setState({
                    form_object: response.data.list,
                })
                console.log(this.state.form_object[1]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    componentWillMount() {
        // this.getAPICheckAllAppointment();
        this.getAPICheckOneApointment();
    }

    // xóa token và đăng xuất
    signOut = () => {
        // console.log(localStorage.getItem("token"));
        localStorage.removeItem("token");
    }
    
    //render
    render() {
        var {form_object} = this.state;

        return(
            <div>
                {/* sidebar */}
                <div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
                    <div className="divider"></div>
                    <ul className="nav menu">
                        <li className="active">
                            <Link to="/">
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Trang chủ
                            </Link>
                        </li>
                        <li>
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
                        <li>
                            <Link to="/HomeAppointmentSession">
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Quản lý phiên
                            </Link>
                        </li>
                        <li>
                            <Link to="/AddAccount">
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Tạo tài khoản
                            </Link>
                        </li>
                        <li>
                            <Link to="/" onClick={this.signOut}>
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Đăng xuất
                            </Link>
                        </li>
                    </ul>
                    {/* /.sidebar */}             
                </div>

                <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                    {/* /.main */}
                    <div className="row mt-60">
                        <ol className="breadcrumb">
                            <li>
                                <em className="fa fa-home"></em>
                            </li>
                            <li className="active">Dashboard</li>
                            <li className="active">Admin</li>
                        </ol>
                    </div>
                    <div className="text-center">
                        <h1>
                            Hê lô Admin                
                        </h1>
                    </div>
                    <br/>
                    {/* data tables */}
                    <div className="">
                        <AppointmentList
                            form_object={form_object}
                            onDetail={this.onDetail} />
                    </div>
                    {/* /.main */}
                </div>
            </div>        
            
        ); 
    }
}
export default HomeAdmin;