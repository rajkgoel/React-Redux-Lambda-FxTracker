import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../images/Forex.jpg';

var styles = {
    backgroundImage: 'url('+image+')'
    };

class Header extends React.Component{
    render() {
        return (
            <div>
                <div className="w3-bar w3-indigo">
                    <p><Link to={`/`} className="w3-bar-item w3-button">Home</Link></p>
                    <p><Link to={`/forexs`} className="w3-bar-item w3-button">Forex view</Link></p>
                    <p><Link to={`/editor`} className="w3-bar-item w3-button">Forex Editor view</Link></p>
                </div>
                <div className="w3-container w3-blue" style={styles}>
                    <h2>{this.props.pageHeader}</h2>
                </div>
            </div>
        );
    }
}

export default Header;