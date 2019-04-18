import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'

import '../App.css';

import Home from './Home';
import NewBooking from './NewBooking';
import CancelBooking from './CancelBooking';

class Main extends Component {
    render() {
        return(
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/NewBooking' component={NewBooking} />
                <Route path='/CancelBooking' component={CancelBooking} />
            </Switch>
        );
    }
}
export default Main;