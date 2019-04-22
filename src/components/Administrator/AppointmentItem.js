import React, {Component} from 'react';
import '../../css/App.css';

class AppointmentItem extends Component {
    // constructor(props) {
    //     super(props);
    // }

    onDetail = () => {
        this.props.onEdit(this.props.form_object.id)
    }

    render() {
        var {form_object, index} = this.props;
        return(
            // bắt sự kiện Edit khi click vào từng dòng trong bảng
            <tr>    
                {/* Số thứ tự */}
                <td>{index + 1}</td>

                {/* Tên */}
                <td>{form_object.name}</td>

                {/* Số điện thoại */}
                <td>{form_object.phoneNumber}</td>

                {/* Ngày */}
                <td>{form_object.day}</td>

                {/* Status */}
                <td>{form_object.status}</td>

                {/* Session */}
                <td>{form_object.session}</td>
                
                {/* Các button chức năng */}
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning m-2"
                        onClick={this.onDetail}>
                        <span className="fa fa-pencil mr-5"></span>
                        Sửa
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-danger m-2"
                        onClick={this.onDelete}>
                        <span className="fa fa-trash mr-5"></span>
                        Xóa
                    </button>
                </td>
            </tr>
        );
    }
}
export default AppointmentItem;