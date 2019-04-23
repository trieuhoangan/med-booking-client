import React, {Component} from 'react';
import axios from 'axios';
class AppointmentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem('appointmentId'),
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
                    id: this.state.id,
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
    
    componentWillMount() {
        this.getAPICheckOneApointment();
    }

    onSubmit = (event) => {

    } 

    render() {
        return(
            <div className="panel panel-info col-xs-13 col-sm-13 col-md-13 col-lg-13">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Xem chi tiết & Sửa thông tin cuộc hẹn
                        &nbsp;
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        {/* Cột 1 */}
                        <div className="col-md-6">

                            {/* Tên lớp học (input) */}
                            <div className="form-group">
                                <label>Tên khách hàng</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    id=""
                                    placeholder="Input field"
                                    value={this.state.name}
                                    onChange={this.onChange} />
                            </div>
                        {/* Button hoàn tất  */}
                        <button
                            type="submit"
                            className="btn btn-primary ml-50p mb-5"
                            disabled={!this.state.name}>
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
                            className="btn btn-danger mb-5"
                            onClick={this.onCloseForm}>
                            <span className="fa fa-times mr-5"></span>
                            Hủy
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default AppointmentDetail;