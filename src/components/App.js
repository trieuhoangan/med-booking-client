import React, {Component} from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import '../css/App.css';

import Home from './Home';
import Login from './Login';
import HomeAdmin from './Administrator/HomeAdmin';
import NewBooking from './NewBooking';
import CancelBooking from './CancelBooking';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('token') !== null
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
        }
    }

    componentWillMount() {
        if (localStorage.getItem('token') !== null) {
            this.setState({
                token: localStorage.getItem('token'),
            })
        }
    }

    render() {
        return (
            <div className="App">
                <div>
                    {/* nav */}
                    <nav className="navbar navbar-custom navbar-fixed-top">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse"><span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span></button>
                                    <a href="/" className="navbar-brand">
                                        <span>Med </span>
                                        .Booking
                                    </a>
                            </div>
                            {/* /.container-fluid  */}
                        </div>
                        {/* /.nav */}
                    </nav>
                </div>
                <div>
                    {/* main */}                
                    <BrowserRouter>
                        <Switch>
                            {/* Public */}
                            <Route exact path='/' component={Home} />                   
                            <Route path='/Login' component={Login} />
                            <Route path='/NewBooking' component={NewBooking} />
                            <Route 
                                path='/CancelBooking' 
                                render={props => <CancelBooking {...props} token={this.state.token} />} />
                            {/* For Administrator only*/}
                            <PrivateRoute path='/HomeAdmin' component={HomeAdmin} />
                        </Switch>
                    </BrowserRouter>
                    {/* /.main */}
                </div>
                
            </div>
        );
    }
}
export default App;