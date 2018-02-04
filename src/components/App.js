import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

class App extends React.Component{
    render() {
        return (
            <div className="container-fluid">
                <p>Home Page</p>
                <p><Link to={`/forexs`}>Forex view</Link></p>
                <p><Link to={`/editor`}>Forex Editor view</Link></p>
            </div>
        );
    }
}
/*
App.PropTypes = {
    children: PropTypes.object.isRequired
};
*/

export default App;