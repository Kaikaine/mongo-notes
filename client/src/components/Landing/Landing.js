import React from 'react';
import { Link } from "react-router-dom";

const Landing = () => {
    return ( <div className='landing'>

        <div>
            <h1 className='text-box'>
                <span className='primary-text'>
                    Simple Notes
                </span>
                <span className='secondary-text'>
                    Simple Note Taking For The Simple Person
                </span>
            </h1>
        </div>

        <div className="buttons">
            <Link to='/login'><button className='login btn' type='button'>Login</button></Link>
            <Link to='/register'><button className='register btn' type='button'>Register</button></Link>
        </div>

    </div> );
}
 
export default Landing;