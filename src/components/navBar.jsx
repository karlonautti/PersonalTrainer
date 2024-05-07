import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div style={{ display: 'flex' }}>
            <Button component={Link} to="/" style={{ margin: '20px', color: 'white' }}>Koti</Button>
            <Button component={Link} to="/customers" style={{ marginRight: '20px', color: 'white' }}>Asiakas</Button>
            <Button component={Link} to="/trainings" style={{ marginRight: '20px', color: 'white' }}>Treenit</Button>
            <Button component={Link} to="/calendar" style={{ color: 'white' }}>Kalenteri</Button>
        </div>
    )
}

{/*import React from 'react';
// import './App.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="App">
            <center>
                <ul>
                    <li><Link to="/">Koti</Link></li>{''}
                    <li><Link to="/customers">Asiakas</Link></li>{''}
                    <li><Link to="/trainings">Treenit</Link></li>{''}
                    <li><Link to="/calendar">Kalenteri</Link></li>{''}
                </ul>
            </center>
        </div>
    )
*/}
