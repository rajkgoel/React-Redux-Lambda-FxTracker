import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component{
    render() {
        return (
            <div>
                <div className="w3-bar w3-teal">
                    <p><Link to={`/`} class="w3-bar-item w3-button">Home</Link></p>
                    <p><Link to={`/forexs`} class="w3-bar-item w3-button">Forex view</Link></p>
                    <p><Link to={`/editor`} class="w3-bar-item w3-button">Forex Editor view</Link></p>
                </div>
                <div class="w3-container w3-teal">
                    <h2>{this.props.pageHeader}</h2>
                </div>
            </div>
        );
    }
}

export default Header;