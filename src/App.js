import React, {Component} from 'react';


import './App.css';

import Main from './components/Main';

class App extends Component {
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
                    <Main />
                    {/* /.main */}
                </div>
                
            </div>
        );
    }
}
export default App;