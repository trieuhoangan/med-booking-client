import React, {Component} from 'react';
import '../../css/App.css';

import AppointmentSessionItem from './AppointmentSessionItem'

class AppointmentSessionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterPhoneNum: '',
            filterDay: '',
            filterSession: '',
            filterStatus: '',
        }
    }

    // onChange = (event) => {
    //     var target = event.target;
    //     var name = target.name;
    //     var value = target.value;
    //     this.props.onFilter(
    //         name === 'filterName' ? value : this.state.filterName,
    //         name === 'filterPhoneNum' ? value : this.state.filterPhoneNum,
    //         name === 'filterDay' ? value : this.state.filterDay,
    //         name === 'filterSession' ? value : this.state.filterSession,
    //         name === 'filterStatus' ? value : this.state.filterStatus,
    //     )
    //     this.setState({
    //         [name]: value
    //     });
    // }

    render() {
        var {day_object} = this.props;
        // var {filterName, filterPhoneNum, filterDay, filterSession, filterStatus} = this.state;
        var elmAppointment = day_object.map((day_object, index) => {
            return <AppointmentSessionItem 
                        key={day_object.id}
                        index={index} 
                        day_object={day_object}
                        onDetail={this.props.onDetail}
                    />
        });

        return(
            <table className="table table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Ngày</th>
                        <th className="text-center">Số ca sáng</th>
                        <th className="text-center">Số ca chiều</th>
                        <th className="text-center">Giới hạn ca sáng</th>
                        <th className="text-center">Giới hạn ca chiều</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input 
                                type="text" 
                                className="form-control"
                                name="filterName" 
                                // value={filterName}
                                onChange={this.onChange}/>
                        </td>
                        <td>
                        <input 
                                type="text" 
                                className="form-control"
                                name="filterPhoneNum" 
                                // value={filterPhoneNum}
                                onChange={this.onChange}/>
                        </td>
                        <td>
                        <input 
                                type="text" 
                                className="form-control"
                                name="filterDay" 
                                // value={filterDay}
                                onChange={this.onChange}/>
                        </td>
                        <td>
                        <input 
                                type="text" 
                                className="form-control"
                                name="filterSession" 
                                // value={filterSession}
                                onChange={this.onChange}/>
                        </td>
                        <td>
                        <input 
                                type="text" 
                                className="form-control"
                                name="filterStatus" 
                                // value={filterStatus}
                                onChange={this.onChange}/>
                        </td>
                        <td></td>
                    </tr>
                    {elmAppointment}
                </tbody>
            </table>
        );
    }
}
export default AppointmentSessionList;