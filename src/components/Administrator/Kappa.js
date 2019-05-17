import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import Pagination from "react-js-pagination";
// import ReactTable from 'react-table';
import AppointmentList from './AppointmentList';
// import { access } from 'fs';

class Kappa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            domain: 'http://localhost:8080',
            filterMonth: '',
            filterYear: '',
            filterDay: '',
            sum_form: 0,
            morning_form: 0,
            afternoon_form: 0,
            canceled_form: 0,
        }
    }

    getFilter=()=>{
        var field=[]
        var value=[]
        var day = ""
        var month="" 
        if(this.state.filterMonth.length===1){
            month="0"+this.state.filterMonth
        }
        else{
            month = this.state.filterMonth
        }
        if(this.state.filterDay.length===1){
            day="0"+this.state.filterDay
        }
        else{
            day = this.state.filterDay
        }
        var date = this.state.filterYear+"-"+month;
        
        if(this.state.day!==""){
            date= date+"-"+ day
        }
        field.push("day")
        value.push(date)
        var body_data={
            field:field,
            value:value,
            pageNumber:1,
            numberForm:'15'
        }
        console.log(body_data)
       
        axios
        .post(
            this.state.domain + "/admin/kappa",
            body_data,
            {
                headers: { 
                    "Authorization": this.state.token,
                    "content-type": "application/json", }
            }
        )
        .then(response => {
            this.setState({
                sum_form:response.data.totalForm,
                morning_form: response.data.morningForm,
                afternoon_form: response.data.afternoonForm,
                canceled_form: response.data.canceledForm,
                
            })
            console.log(response.data);
            // this.data = response.data.list;


        })
        .catch(function (error) {
            console.log(error);
        });
    
        
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }



    componentWillMount() {
       
       
    }

    // xóa token và đăng xuất
    signOut = () => {
        // console.log(localStorage.getItem("token"));
        localStorage.removeItem("token");
    }
    
    //render
    render() {
      
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
                        <li>
                            <Link to="/MultiBooking" >
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Đăng ký tập thể
                            </Link>
                        </li>
                        <li>
                            <Link to="/StayBooking">
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Đăng ký nội trú
                            </Link>
                        </li>
                        <li>
                            <Link to="/OldCustomer">
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Đăng ký cũ
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
                            <Link to="/CalendarManager">
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Quản lý phiên
                            </Link>
                        </li>
                        <li className="active">
                            <Link to="/Kappa">
                                <em className="fa fa-dashboard">
                                    &nbsp;
                                </em>
                                Thống kê
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
                            Thống kê             
                        </h1>
                    </div>
                    <br/>
                    {/* data tables */}
                    <div className="">
                        <table className="table table-hover mt-15">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th className="text-center">Ngày </th>
                                    <th className="text-center">Tháng<font color="red">*</font></th>
                                    <th className="text-center">Năm<font color="red">*</font></th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                   <td></td>
                                   <td></td>
                                   <td></td>
                                    <td style={{width:"18%"}}>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            name="filterDay" 
                                            value={this.state.filterName}
                                            onChange={this.onChange}
                                            />
                                    </td>
                                    <td style={{width:"18%"}}>
                                    <input 
                                            type="text" 
                                            className="form-control"
                                            name="filterMonth" 
                                            value={this.state.filterMonth}
                                            onChange={this.onChange}
                                            />
                                    </td>
                                    <td style={{width:"18%"}}>
                                    <input 
                                            type="text" 
                                            className="form-control"
                                            name="filterYear" 
                                            value={this.state.filterYear}
                                            onChange={this.onChange}
                                            />
                                    </td>
                                    
                                    
                                    
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                            disabled={!this.state.filterMonth||!this.state.filterYear}
                                            onClick={this.getFilter}
                                        >
                                            search
                                        </button>
                                    </td>
                                </tr>
                                
                            </tbody>
                            
                        </table>
                        <div class="panel panel-container">
                            <div class="row">
                                <div class="col-xs-6 col-md-3 col-lg-3 no-padding">
                                    <div class="panel panel-teal panel-widget border-right">
                                        <div class="row no-padding"><em class="fa fa-xl fa-comments color-blue"></em>
                                            <div class="large">
                                                {this.state.sum_form}
                                            </div>
                                            <div class="text-muted">Tổng số lịch hẹn</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-md-3 col-lg-3 no-padding">
                                    <div class="panel panel-blue panel-widget border-right">
                                        <div class="row no-padding"><em class="fa fa-xl fa-comments color-orange"></em>
                                            <div class="large">
                                                {this.state.morning_form}
                                            </div>
                                            <div class="text-muted">Số lịch hẹn vào buổi sáng</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-md-3 col-lg-3 no-padding">
                                    <div class="panel panel-orange panel-widget border-right">
                                        <div class="row no-padding"><em class="fa fa-xl fa-comments color-teal"></em>
                                            <div class="large">
                                                {this.state.afternoon_form}
                                            </div>
                                            <div class="text-muted">Số lịch hẹn vào buổi chiều</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-md-3 col-lg-3 no-padding">
                                    <div class="panel panel-red panel-widget ">
                                        <div class="row no-padding"><em class="fa fa-xl fa-comments color-red"></em>
                                            <div class="large">
                                                {this.state.canceled_form}
                                            </div>
                                            <div class="text-muted">Số lịch hẹn vào bị hủy</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                   
                   
                    {/* /.main */}
                    {/* return */}
                    
                </div>
            </div>        
            
        ); 
    }
}
export default Kappa;