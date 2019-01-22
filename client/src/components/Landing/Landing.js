import React from 'react';

const Landing = () => {
    return ( <div className='landing'>

        <div>
            <h1 className='text-box'>
                <span className='primary-text'>
                    Simple Notes
                </span>
                <span className='secondary-text'>
                    A Simple Note Taking App
                </span>
            </h1>
        </div>

        <div className="buttons">
            <button className='login btn' type='button'>Login</button>
            <button className='register btn' type='button'>Register</button>
        </div>

    </div> );
}
 
export default Landing;