import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import M from "materialize-css/dist/js/materialize.min.js";

export default class Navigation extends Component {
    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems, {
                edge: "left",
                inDuration: 250
            });
          });
    }
    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue-grey darken-4">
                        <div className="container">
                            <Link to="/" className="brand-logo">Challenge</Link>
                            <Link data-target="mobile-demo" className="sidenav-trigger" to="#"><i className="material-icons">menu</i>Menu</Link>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/post">Post</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <ul className="sidenav" id="mobile-demo">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/post">Post</Link></li>
                </ul>
            </div>
        )
    }
}
