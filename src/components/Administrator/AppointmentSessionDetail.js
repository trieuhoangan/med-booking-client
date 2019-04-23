import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import '../../css/App.css';

class AppointmentSessionDetail extends Component {
    // Hàm khởi tạo
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            domain: 'http://localhost:8080',
            day: localStorage.getItem('dayOjDay'),
            morningCase: localStorage.getItem('dayOjmorningCase'),
            afternoonCase: localStorage.getItem('dayOjmorningMaxCase'),
            morningMaxCase: localStorage.getItem('dayOjafternoonCase'),
            afternoonMaxCase: localStorage.getItem('dayOjafternoonMaxCase'),           
        }
        // xóa data trong localStorage
        localStorage.removeItem('dayOjDay');
        localStorage.removeItem('dayOjmorningCase');
        localStorage.removeItem('dayOjmorningMaxCase');
        localStorage.removeItem('dayOjafternoonCase');
        localStorage.removeItem('dayOjafternoonMaxCase');     
    }
    
    
    componentWillMount() {
        console.log(this.state.day);
    }
    

    // Bắt sự kiện thay đổi trường input
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name]: value
        })
        console.log(name + " - " + value);
    }

    onSubmit = (event) => {
        //chặn submit lên url
        event.preventDefault();
        var day_object = {
            day: this.state.day,
            morningCase: this.state.morningCase,
            afternoonCase: this.state.afternoonCase,
            morningMaxCase: this.state.morningMaxCase,
            afternoonMaxCase: this.state.afternoonMaxCase,
        }
        axios
            .post(
                this.state.domain + "/admin/config_schedule",
                {day_object},
                {
                    headers: { 
                        "Authorization": this.state.token,
                        "content-type": "application/json", }
                }
            )
            .then(response => {
                if (response.data.status === "good") {
                    alert("Sửa thành công!");
                } else {
                    alert("Lỗi!");
                }
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    
    render() {
        var {day, morningCase, afternoonCase, morningMaxCase, afternoonMaxCase} = this.state;

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
                        <li>
                            <Link to="/NewBooking">
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Đặt lịch khám
                            </Link>
                        </li>
                        <li >
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
                            <ul>
                                <li>
                                    <em className="fa fa-dashboard">
                                        &nbsp;
                                    </em>
                                    Chi tiết
                                </li>
                            </ul>
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
                            <li className="active">Chi tiết phiên làm việc</li>
                        </ol>
                    </div>
                    <div>
                        <h1>
                            Chi tiết phiên làm việc              
                        </h1>
                    </div>
                    <br/>
                    {/* form */}
                    <div className="panel panel-info col-xs-13 col-sm-13 col-md-13 col-lg-13">
                        <div className="panel-heading">
                            <h2 className="panel-title">
                                <b>
                                    Sửa thông tin phiên làm việc
                                </b> 
                                &nbsp;
                            </h2>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.onSubmit}>
                                {/* Tên lớp học (input) */}
                                <div className="form-group">
                                    <label>Ngày</label>
                                    <input
                                        type="text"
                                        name="day"
                                        className="form-control"
                                        placeholder="Ngày"
                                        disabled={true}
                                        value={day}
                                        onChange={this.onChange} />
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Số ca sáng</label>
                                        <input
                                            type="text"
                                            name="morningCase"
                                            className="form-control"
                                            placeholder="Số ca sáng"
                                            value={morningCase}
                                            onChange={this.onChange} />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Số ca chiều</label>
                                        <input
                                            type="text"
                                            name="afternoonCase"
                                            className="form-control"
                                            placeholder="Số ca chiều"
                                            value={afternoonCase}
                                            onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Giới hạn ca sáng</label>
                                        <input
                                            type="text"
                                            name="morningMaxCase"
                                            className="form-control"
                                            placeholder="Giới hạn ca sáng"
                                            value={morningMaxCase}
                                            onChange={this.onChange} />
                                    </div>

                                    <div className="form-group">
                                        <label>Giới hạn ca chiều</label>
                                        <input
                                            type="text"
                                            name="afternoonMaxCase"
                                            className="form-control"
                                            placeholder="Giới hạn ca chiều"
                                            value={afternoonMaxCase}
                                            onChange={this.onChange} />
                                    </div>
                                </div>
                                
                                    {/* Button hoàn tất  */}
                                <button
                                    type="submit"
                                    className="btn btn-primary ml-50p mb-5"
                                    disabled={!this.state.day
                                        ||  !this.state.morningCase
                                        ||  !this.state.afternoonCase
                                        ||  !this.state.morningMaxCase
                                        ||  !this.state.afternoonMaxCase}
                                    >
                                    <span className="fa fa-check mr-5"></span>
                                    Hoàn tất
                                </button>
                                &nbsp;
                                    {/* <button 
                                    type="button" 
                                    className="btn btn-warning mb-5"
                                    onClick={this.onClearForm}>
                                    Đặt lại
                                    </button>                        */}
                                &nbsp;
                                <button
                                    type="button"
                                    className="btn btn-danger mb-5">
                                    <span className="fa fa-times mr-5"></span>
                                    Hủy
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* /.main */}
                </div>              
            </div>        
        );
    }
    
}
export default AppointmentSessionDetail;