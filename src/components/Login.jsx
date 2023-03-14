import React, { useState, useContext } from 'react';
import { AccountContext } from './CognitoContext';


const Login = () => {
    const [state, setState] = useState({
        username: '',
        email: '',
        password: ''
    })

    const { authenticate } = useContext(AccountContext)
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await authenticate(state)
            console.log('================user====================');
            console.log(user);
            console.log('====================================');
        } catch (error) {

        }
    }
    return (
        <div className='child'>
            Login
            <form onSubmit={handleSubmit} >
                <div><label htmlFor="">username</label><input type="text" name="username" id="" onChange={(e) => handleChange(e)} /></div>
                <div><label htmlFor="">email</label><input type="text" name="email" id="" onChange={(e) => handleChange(e)} /></div>
                <div><label htmlFor="">password</label><input type="text" name="password" id="" onChange={(e) => handleChange(e)} /></div>
                <div><button>Login</button></div>
            </form>
        </div>
    );
}

export default Login;
