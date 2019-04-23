import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import '../../css/App.css';
import AppointmentSessionList from './AppointmentSessionList';

class HomeAppointmentSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            domain: 'http://localhost:8080',
            day_object: [],
        }
    }

    // lấy API /check_available_case
    getAPICheckAvailableCase = () => {
        axios
            .get(
                this.state.domain + "/check_available_case",
                {},
                {
                    headers: { "content-type": "application/json" }
                }
            )
            .then(response => {
                this.setState({
                    day_object: response.data              
                })
            })
    }

    // CWM
    componentWillMount() {
        this.getAPICheckAvailableCase();
    }

    // xóa token và đăng xuất
    signOut = () => {
        // console.log(localStorage.getItem("token"));
        localStorage.removeItem("token");
    }

    render() {
        // Lấy day_object từ state để sử dụng
        var {day_object} = this.state;

        // render Jsx
        return(
            <div>
            {/* sidebar */}
            <div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
                <div className="divider"></div>
                <ul className="nav menu">
                    <li>
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
                    <li className="active">
                        <Link to="/HomeAppointmentSession">
                            <em className="fa fa-dashboard">
                                &nbsp;
                            </em>
                            Quản lý phiên
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
                        <li className="active">Quản lý phiên</li>
                    </ol>
                </div>
                <div>
                    <h1>
                        Danh sách phiên làm việc               
                    </h1>
                </div>
                <br/>
                {/* data tables */}
                <div className="">
                    <AppointmentSessionList
                        day_object={day_object}
                        onDetail={this.onDetail} />
                </div>
                {/* /.main */}
            </div>
        </div>        
        );
    }
}
export default HomeAppointmentSession;