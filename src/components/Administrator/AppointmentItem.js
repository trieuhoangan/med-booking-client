import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../css/App.css';

class AppointmentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            domain: 'http://localhost:8080',
            name: this.props.form_object[1],
            phoneNumber: this.props.form_object[2],
            day: this.props.form_object[3],
            status: this.props.form_object[4],
            session: this.props.form_object[5],
        }
    }

    onDetail = () => {
        localStorage.setItem("appointmentId", JSON.stringify(this.props.form_object.id));
    }

    render() {
        var {form_object, index} = this.props;
        console.log(form_object)
        return(
            // bắt sự kiện Edit khi click vào từng dòng trong bảng
            <tr>    
                {/* Số thứ tự */}
                <td>{index + 1}</td>

                {/* Tên */}
                <td>{form_object[1]}</td>

                {/* Số điện thoại */}
                <td>{form_object[2]}</td>

                {/* Ngày */}
                <td>{form_object[3]}</td>

                {/* Status */}
                <td>{form_object[4]}</td>

                {/* Session */}
                <td>{form_object[5]}</td>
                
                {/* Các button chức năng */}
                <td className="text-center">
                    <Link to='/AppointmentDetail'>
                        <button 
                            type="button" 
                            className="btn btn-warning m-2"
                            onClick={this.onDetail}>
                            <span className="fa fa-pencil mr-5"></span>
                            Chi tiết
                        </button>
                    </Link>
                    
                    {/* <button 
                        type="button" 
                        className="btn btn-danger m-2"
                        onClick={this.onDelete}>
                        <span className="fa fa-trash mr-5"></span>
                        Xóa
                    </button> */}
                </td>
            </tr>
        );
    }
}
export default AppointmentItem;