import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        }
    }
    
    render() { 
        return ( <div>

            <form>
                <div>
                    <label htmlFor="username">Choose a username</label>
                    <input type="text" className='username' id='username' placeholder='username'/>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" class="password" id="password" placeholder="Password"/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

        </div> );
    }
}
 
export default Register;