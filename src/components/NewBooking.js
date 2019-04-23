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
            phoneNumber: '',
            day: '',
            session:'morning',
            status: 'waiting',
            result: '',
            code: '',
            stay: true,
            begin: '',
            end: '',
            dayId: '',
            // stayCheck: false,
            day_object: [],
        }
    }

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
                // console.log(this.state.day_object);
            })
            
    }

    componentWillMount() {
        this.getAPICheckAvailableCase();
        this.setState({
            stay: false,
        })
    }

    //TODO Bắt sự kiện thay đổi trường input
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;  
        if (name === 'stay') {
            target.value === "true" ? value = true : value = false;
        }     
        this.setState({
            [name]: value
        })
        this.stayCheck(); 
        localStorage.setItem('stay',this.state.stay)
        console.log(this.state.stay)
        console.log(this.state.stayCheck)
    }

    onClearForm = () => {
        this.setState({
            id: '',
            name: '',
            phoneNumber: '',
            day: '',
            session:'morning',
            status: 'waiting',
            result: '',
            code: '',
            stay: true,
            begin: '',
            end: '',
            dayId: '',
            // stayCheck: false,
            day_object: [],
        })
    }

    stayCheck = () => {
        if (this.state.stay === true) {
            this.setState({
                stayCheck: true,
            })          
        }
        else if (this.state.stay === false 
            && this.state.begin !== '' 
            && this.state.end !== '') {
                this.setState({
                    stayCheck: true,
                })
            }
        else {
            this.setState({
                stayCheck: false,
            })
        }
    }

    onSubmit = (event) => {
        //chặn submit lên url
        event.preventDefault();
        var form_object=  {
            id: '',
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            day: this.state.day,
            session:this.state.session,
            status: this.state.status,
            result: this.state.result,
            code: this.state.code,
            stay: this.state.stay,
            begin: this.state.begin,
            end: this.state.end,
            dayId: this.state.dayId,

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
        this.onClearForm();
    }


    // xóa token và đăng xuất
    signOut = () => {
        // console.log(localStorage.getItem("token"));
        localStorage.removeItem("token");
    }

    render() {
        var {day_object} = this.state;
        var availableDay = day_object.map((day_object, index) => {
            return <option 
                key={day_object.id} 
                index={index} 
                value={day_object.day}>
                    {day_object.day}
                </option>
        });

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

        var homeAppointmentSession;
        if (localStorage.getItem('token') !== null) {
            homeAppointmentSession = 
                        <Link to="/HomeAppointmentSession">
                            <em className="fa fa-dashboard">
                                &nbsp;
                            </em>
                            Quản lý phiên
                        </Link>
        } else {
            homeAppointmentSession = null;
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

                        <li>
                            {homeAppointmentSession}
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
                            <li className="active">Đặt lịch</li>
                        </ol>
                    </div>
                    <div>
                        <h1>
                            Form đặt lịch
                        </h1>
                        <div className="panel panel-info col-xs-13 col-sm-13 col-md-13 col-lg-13">
                            <div className="panel-heading">
                                <h3 className="panel-title">
                                    Đặt lịch khám bệnh
                                    &nbsp;
                                </h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="col-md-6">                                  
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

                                        {/* Thời gian (input) */}
                                        <div className="form-group">
                                            <label>Ngày</label>
                                            <select
                                                className="form-control"
                                                name="day"
                                                value={this.state.day}
                                                onChange={this.onChange}>
                                                {availableDay}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        {/* Số điện thoại (input) */}
                                        <div className="form-group">
                                            <label>Số điện thoại</label>
                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                className="form-control"
                                                id=""
                                                placeholder="số điện thoại"
                                                value={this.state.phoneNumber}
                                                onChange={this.onChange} />
                                        </div>
                                        

                                        {/* Session (select) */}
                                        <div className="form-group">
                                            <label>Phiên</label>
                                            <select
                                                className="form-control"
                                                name="session"
                                                value={this.state.session}
                                                onChange={this.onChange}>
                                                <option value="morning">Buổi sáng</option>
                                                <option value="afternoon">Buổi chiều</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">    
                                        {/* stay (radio) */}
                                        <div className="form-group">
                                            <label>Nội trú</label>
                                            <div className="radio">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="stay"
                                                        onClick={this.onChange}
                                                        value="true"
                                                         />
                                                    <span className="label label-success">
                                                        Có
                                                        </span>
                                                </label>
                                            </div>
                                            <div className="radio">
                                                <label>
                                                <input  type="radio" 
                                                        name="stay" 
                                                        value={false}
                                                        onChange={this.onChange} />
                                                    <span className="label label-default">
                                                        Không
                                                        </span>
                                                </label>
                                            </div>
                                        </div>
                                        {/* Begin (input) */}
                                        <div className="form-group">
                                            <label>Ngày nhập viện</label>
                                            <input
                                                type="date"
                                                name="begin"
                                                className="form-control"
                                                id=""
                                                placeholder="Ngày nhập viện"
                                                disabled={!this.state.stay}
                                                value={this.state.begin}
                                                onChange={this.onChange} />
                                        </div>

                                        {/* Thời gian (input) */}
                                        <div className="form-group">
                                            <label>Số ngày nội trú</label>
                                            <input
                                                type="text"
                                                name="end"
                                                className="form-control"
                                                id=""
                                                placeholder=""
                                                disabled={!this.state.stay}
                                                value={this.state.end}
                                                onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                    <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={!this.state.name
                                                || !this.state.phoneNumber
                                                || !this.state.day
                                                || !this.state.session
                                                || (this.state.stayCheck === false)}
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
                                    </div>                        
                                        
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